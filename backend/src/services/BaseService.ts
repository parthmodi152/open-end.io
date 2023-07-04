import { Params } from '@feathersjs/feathers';
import { KnexService } from '@feathersjs/knex';
import type { KnexAdapterOptions } from '@feathersjs/knex';
import type { Application } from '../declarations';
import { AWSClient } from '../aws';

export interface AuthenticatedParams extends Params {
  user: any,
  file?: Express.Multer.File
}

export class BaseService<ServiceParams extends Params = AuthenticatedParams> extends KnexService {
  protected app: Application;
  protected aws: AWSClient;

  constructor(options: KnexAdapterOptions, app: Application) {
    super(options);
    const awsClient = app.get('awsClient');
    if (!awsClient) {
      throw new Error('awsClient is not defined in the application');
    }
    this.aws = awsClient;
    this.app = app;
  }
}
