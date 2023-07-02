import type { Params } from '@feathersjs/feathers';
import { KnexService } from '@feathersjs/knex';
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex';
import type { Application } from '../../declarations';
import type { Payment, PaymentData, PaymentPatch, PaymentQuery } from './payment.schema';
export type { Payment, PaymentData, PaymentPatch, PaymentQuery };
export interface PaymentParams extends KnexAdapterParams<PaymentQuery> {
}
export declare class PaymentService<ServiceParams extends Params = PaymentParams> extends KnexService<Payment, PaymentData, PaymentParams, PaymentPatch> {
}
export declare const getOptions: (app: Application) => KnexAdapterOptions;
