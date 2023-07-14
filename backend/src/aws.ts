import { Application } from './declarations';
import {
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  DeleteObjectCommandOutput,
  PutObjectCommand,
  PutObjectCommandInput,
  PutObjectCommandOutput,
  S3Client,
  S3ClientConfig,
} from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import {LambdaClient, LambdaClientConfig, InvokeCommand, InvokeCommandOutput } from '@aws-sdk/client-lambda';

export interface AwsConfig {
  region?: string;
  s3Bucket: string;
  endpoint?: string;
  cloudFrontUrl: string;
}
export class AWSClient {
  private s3Bucket: string;
  private cloudFrontUrl: string;

  private S3ClientConfig: S3ClientConfig = {
    apiVersion: 'latest',
  };

  private LambdaClientConfig: LambdaClientConfig = {
    apiVersion: 'latest',
  };

  private s3Client: S3Client;
  private lambdaClient: LambdaClient;

  constructor(awsConfig: AwsConfig) {
    const { region, s3Bucket, endpoint, cloudFrontUrl } = awsConfig;
    if (region) {
      this.S3ClientConfig.region = region;
      this.LambdaClientConfig.region = region;
    }
    if (endpoint) {
      this.S3ClientConfig.endpoint = endpoint;
      this.S3ClientConfig.forcePathStyle = true;
    }

    this.s3Bucket = s3Bucket;
    this.cloudFrontUrl = cloudFrontUrl;
    this.s3Client = new S3Client(this.S3ClientConfig);
    this.lambdaClient = new LambdaClient(this.LambdaClientConfig);
  }

  //   Lambda
  public async invokeLambda(functionName: string, payload: any): Promise<InvokeCommandOutput> {
    const command = new InvokeCommand({
      FunctionName: functionName,
      Payload: JSON.stringify(payload),
    });

    return this.lambdaClient.send(command);
  }

  public async store(
    key: string,
    body: Readable | ReadableStream<any> | Blob | Buffer | Uint8Array | undefined,
    contentType = 'application/octet-stream'
  ): Promise<PutObjectCommandOutput> {
    const uploadParams: PutObjectCommandInput = {
      Bucket: this.s3Bucket,
      Key: key,
      ContentType: contentType,
      Body: body,
    };
    const command: PutObjectCommand = new PutObjectCommand(uploadParams);
    return this.s3Client.send(command);
  }

  public delete(key: string): Promise<DeleteObjectCommandOutput> {
    const deleteParams: DeleteObjectCommandInput = {
      Bucket: this.s3Bucket,
      Key: key,
    };
    const command: DeleteObjectCommand = new DeleteObjectCommand(deleteParams);
    return this.s3Client.send(command);
  }

  public getUrl(key: string): string {
    return `${this.cloudFrontUrl}/${key}`;
  }
}

export default function (app: Application): void {
  app.set('awsClient', new AWSClient(app.get('aws')));
}