import type { Application } from '../../declarations';
import { CompaniesService } from './companies.class';
import { companiesPath } from './companies.shared';
export * from './companies.class';
export * from './companies.schema';
export declare const companies: (app: Application) => void;
declare module '../../declarations' {
    interface ServiceTypes {
        [companiesPath]: CompaniesService;
    }
}
