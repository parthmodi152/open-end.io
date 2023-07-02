import type { Params } from '@feathersjs/feathers';
import type { ClientApplication } from '../../client';
import type { Companies, CompaniesData, CompaniesPatch, CompaniesQuery, CompaniesService } from './companies.class';
export type { Companies, CompaniesData, CompaniesPatch, CompaniesQuery };
export type CompaniesClientService = Pick<CompaniesService<Params<CompaniesQuery>>, (typeof companiesMethods)[number]>;
export declare const companiesPath = "companies";
export declare const companiesMethods: readonly ["find", "get", "create", "patch", "remove"];
export declare const companiesClient: (client: ClientApplication) => void;
declare module '../../client' {
    interface ServiceTypes {
        [companiesPath]: CompaniesClientService;
    }
}
