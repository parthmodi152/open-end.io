// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers';
import type { KnexAdapterOptions, KnexAdapterParams } from '@feathersjs/knex';
import { KnexService } from '@feathersjs/knex';

import type { Application } from '../../declarations';
import type { User, UserData, UserPatch, UserQuery } from './users.schema';
import { Companies } from '../companies/companies.schema';

export type { User, UserData, UserPatch, UserQuery };

export interface UserParams extends KnexAdapterParams<UserQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class UserService<
  ServiceParams extends Params = UserParams
> extends KnexService<User, UserData, UserParams, UserPatch> {
  constructor(options: KnexAdapterOptions) {
    super(options);
  }

  async create(data: any, params?: ServiceParams): Promise<any> {
    // Additional actions on user creation
    const userData = await super.create(data, params);

    if (userData && userData.companyUuid) {
      const company = await this.Model<Companies>('companies')
        .where({ uuid: userData.companyUuid })
        .first();
      if (company) {
        await this.Model<Companies>('companies').where({ uuid: company.uuid }).update({
          credit: parseInt(company.credit.toString()),
        });
      }
    }
    return userData;
  }
}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    id: 'uuid',
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'users',
  };
};
