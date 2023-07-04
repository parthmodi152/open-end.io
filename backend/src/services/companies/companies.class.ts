// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers';
import { KnexService } from '@feathersjs/knex';
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex';

import type { Application } from '../../declarations';
import type { Companies, CompaniesData, CompaniesPatch, CompaniesQuery } from './companies.schema';

export type { Companies, CompaniesData, CompaniesPatch, CompaniesQuery };

export interface CompaniesParams extends KnexAdapterParams<CompaniesQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class CompaniesService<ServiceParams extends Params = CompaniesParams> extends KnexService<
  Companies,
  CompaniesData,
  CompaniesParams,
  CompaniesPatch
> {
  async hasSufficientCredits(companyId: string, requiredCredits: number): Promise<boolean> {
    const company = await this.get(companyId);
    return company.credits >= requiredCredits;
  }

  async deductCredits(companyId: string, credits: number): Promise<void> {
    const company = await this.get(companyId);
    company.credits -= credits;
    await this.update(companyId, company);
  }
}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    id: 'uuid',
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'companies'
  };
};
