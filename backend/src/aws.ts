import { Application } from './declarations';
import aws, { S3, Lambda } from 'aws-sdk';
import { Readable } from 'stream';
import { ManagedUpload } from 'aws-sdk/clients/s3';

interface AwsConfig {
  region: string,
  bucket: string,
  cloudFrontUrl: string,
  keypairId: string,
  enableSignedUrls: boolean
}

export class AWSClient {
  public s3Client: aws.S3;
  public lambdaClient: aws.Lambda;
  public urlSigner: aws.CloudFront.Signer | null = null;
  private readonly bucket: string;

  constructor(awsConfig: AwsConfig) {
    const { region, bucket, keypairId, enableSignedUrls } = awsConfig;
    aws.config.update({ region });
    this.bucket = bucket;
    this.s3Client = new aws.S3({ apiVersion: 'latest' });
    this.lambdaClient = new aws.Lambda({ apiVersion: 'latest' });
    if (enableSignedUrls) {
      this.urlSigner = new aws.CloudFront.Signer(keypairId, process.env.CLOUDFRONT_PK ? process.env.CLOUDFRONT_PK : '');
    }
  }

  //   Lambda
  public invokeLambda(functionName: string, payload: any): Promise<Lambda.Types.InvocationResponse> {
    const params: Lambda.Types.InvocationRequest = {
      FunctionName: functionName,
      InvocationType: 'Event', // This makes the invocation asynchronous
      Payload: JSON.stringify(payload),
    };

    return this.lambdaClient.invoke(params).promise();
  }
  
  //   S3
  public store(what: Readable | Buffer, key: string, contentType: string, contentDisposition: string | null = null): Promise<ManagedUpload.SendData> {
    const params: S3.Types.PutObjectRequest = {
      Bucket: this.bucket,
      Body: what,
      Key: key,
      ContentType: contentType
    };
    if (contentDisposition) {
      params.ContentDisposition = contentDisposition;
    }
    return this.s3Client.upload(params).promise();
  }

  public signUrl(key: string, expirationMinutes = 60): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.urlSigner) {
        const url = `https://${this.bucket}.s3.${aws.config.region}.amazonaws.com/${key}`;
        resolve(this.urlSigner.getSignedUrl({ url, expires: Math.floor((new Date()).getTime() / 1000) + (60 * expirationMinutes) }));
      } else {
        reject('URL signing is not enabled');
      }
    });
  }
}

export default function (app: Application): void {
  app.set('awsClient', new AWSClient(app.get('aws')));
}
