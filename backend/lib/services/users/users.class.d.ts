import type { Params } from '@feathersjs/feathers';
import type { KnexAdapterOptions, KnexAdapterParams } from '@feathersjs/knex';
import { KnexService } from '@feathersjs/knex';
import type { Application } from '../../declarations';
import type { User, UserData, UserPatch, UserQuery } from './users.schema';
export type { User, UserData, UserPatch, UserQuery };
export interface UserParams extends KnexAdapterParams<UserQuery> {
}
export declare class UserService<ServiceParams extends Params = UserParams> extends KnexService<User, UserData, UserParams, UserPatch> {
    constructor(options: KnexAdapterOptions);
}
export declare const getOptions: (app: Application) => KnexAdapterOptions;
