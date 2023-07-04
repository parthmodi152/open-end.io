import { Params } from '@feathersjs/feathers';
import { KnexService } from '@feathersjs/knex';
import type { KnexAdapterOptions } from '@feathersjs/knex';
import type { Application } from '../declarations';
import { S3Client } from '../s3';

export interface AuthenticatedParams extends Params {
  user: any,
  file?: Express.Multer.File
}

export class BaseService<ServiceParams extends Params = AuthenticatedParams> extends KnexService {
  protected app: Application;
  protected s3: S3Client;

  constructor(options: KnexAdapterOptions, app: Application) {
    super(options);
    const s3Client = app.get('s3Client');
    if (!s3Client) {
      throw new Error('s3Client is not defined in the application');
    }
    this.s3 = s3Client;
    this.app = app;
  }
}
