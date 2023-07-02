import type { TransportConnection, Application } from '@feathersjs/feathers';
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client';
import './services/payment/payment.shared';
export type { Payment, PaymentData, PaymentQuery, PaymentPatch } from './services/payment/payment.shared';
import './services/project/project.shared';
export type { Project, ProjectData, ProjectQuery, ProjectPatch } from './services/project/project.shared';
import './services/companies/companies.shared';
export type { Companies, CompaniesData, CompaniesQuery, CompaniesPatch } from './services/companies/companies.shared';
import './services/users/users.shared';
export type { User, UserData, UserQuery, UserPatch } from './services/users/users.shared';
export interface Configuration {
    connection: TransportConnection<ServiceTypes>;
}
export interface ServiceTypes {
}
export type ClientApplication = Application<ServiceTypes, Configuration>;
/**
 * Returns a typed client for the openend-io app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export declare const createClient: <Configuration_1 = any>(connection: TransportConnection<ServiceTypes>, authenticationOptions?: Partial<AuthenticationClientOptions>) => ClientApplication;
