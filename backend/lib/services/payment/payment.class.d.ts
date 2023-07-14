import type { KnexAdapterOptions } from '@feathersjs/knex';
import type { Application } from '../../declarations';
import type { Payment, PaymentData, PaymentPatch, PaymentQuery } from './payment.schema';
import { AuthenticatedParams, BaseService } from '../BaseService';
export type { Payment, PaymentData, PaymentPatch, PaymentQuery };
export interface PaymentParams extends AuthenticatedParams {
}
export declare class PaymentService extends BaseService {
    constructor(options: KnexAdapterOptions & {
        app: Application;
    });
    create(data: PaymentData, params?: PaymentParams): Promise<Payment>;
    create(data: PaymentData[], params?: PaymentParams): Promise<Payment[]>;
}
export declare const getOptions: (app: Application) => KnexAdapterOptions & {
    app: Application;
};
