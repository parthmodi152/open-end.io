// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers';
import { KnexService } from '@feathersjs/knex';
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex';

import type { Application } from '../../declarations';
import type { Payment, PaymentData, PaymentPatch, PaymentQuery } from './payment.schema';

export type { Payment, PaymentData, PaymentPatch, PaymentQuery };

export interface PaymentParams extends KnexAdapterParams<PaymentQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class PaymentService<ServiceParams extends Params = PaymentParams> extends KnexService<
  Payment,
  PaymentData,
  PaymentParams,
  PaymentPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    id: 'uuid',
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'payment'
  };
};