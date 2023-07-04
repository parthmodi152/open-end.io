// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers';
import { KnexService } from '@feathersjs/knex';
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex';

import type { Application } from '../../declarations';
import type { Project, ProjectData, ProjectPatch, ProjectQuery } from './project.schema';
import { AuthenticatedParams, BaseService } from '../BaseService';

export type { Project, ProjectData, ProjectPatch, ProjectQuery };

export interface ProjectParams extends AuthenticatedParams {
  file?: Express.Multer.File;
}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class ProjectService extends BaseService {

  constructor(options: KnexAdapterOptions & { app: Application }) {
    super(options, options.app);
  }

    async create(data: ProjectData, params?: ProjectParams): Promise<Project>
    async create(data: ProjectData[], params?: ProjectParams): Promise<Project[]>
    async create(
      data: ProjectData | ProjectData[],
      params?: ProjectParams
    ): Promise<Project | Project[]> {
      if (Array.isArray(data)) {
        for (let item of data) {
          let key = await this.processFileUpload(item, params);
          item.dataFileUrl = key;
        }
      } else {
        let key = await this.processFileUpload(data, params);
        data.dataFileUrl = key;
      }
      return super.create(data, params);
    }

    private async processFileUpload(data: ProjectData, params?: ProjectParams) {
      const { file } = params!;
      if (file) {
        const key = `${data.companyUuid}/${data.name}/${file.originalname}`;
        await this.aws.store(file.stream, key, file.mimetype);
        return key
      }
}

}

export const getOptions = (app: Application): KnexAdapterOptions & { app: Application } => {
  return {
    id: 'uuid',
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'project',
    app: app
  };
};
