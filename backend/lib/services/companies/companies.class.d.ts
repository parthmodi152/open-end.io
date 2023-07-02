import type { Params } from '@feathersjs/feathers';
import { KnexService } from '@feathersjs/knex';
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex';
import type { Application } from '../../declarations';
import type { Companies, CompaniesData, CompaniesPatch, CompaniesQuery } from './companies.schema';
export type { Companies, CompaniesData, CompaniesPatch, CompaniesQuery };
export interface CompaniesParams extends KnexAdapterParams<CompaniesQuery> {
}
export declare class CompaniesService<ServiceParams extends Params = CompaniesParams> extends KnexService<Companies, CompaniesData, CompaniesParams, CompaniesPatch> {
}
export declare const getOptions: (app: Application) => KnexAdapterOptions;
