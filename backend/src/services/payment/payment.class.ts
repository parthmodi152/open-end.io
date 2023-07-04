// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers';
import { KnexService } from '@feathersjs/knex';
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex';

import type { Application } from '../../declarations';
import type { Payment, PaymentData, PaymentPatch, PaymentQuery } from './payment.schema';
import { AuthenticatedParams, BaseService } from '../BaseService';

export type { Payment, PaymentData, PaymentPatch, PaymentQuery };

export interface PaymentParams extends AuthenticatedParams {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class PaymentService extends BaseService {

  constructor(options: KnexAdapterOptions & { app: Application }) {
    super(options, options.app);
  }

  async create(data: PaymentData, params?:  PaymentParams): Promise<Payment>
  async create(data: PaymentData[], params?:  PaymentParams): Promise<Payment[]>
  async create(data: PaymentData | PaymentData[], params?: PaymentParams): Promise<Payment | Payment[]> {
    const companyService = this.app.service('companies');
    const cost = 5;
  
    if (Array.isArray(data)) {
      // If data is an array, loop through each item
      for (const item of data) {
        const companyId = item.companyUuid;

        if (!await companyService.hasSufficientCredits(companyId, cost)) {
          throw new Error('Company does not have enough credits');
        }

        await companyService.deductCredits(companyId, cost);
      }
    } else {
      // If data is an object
      const companyId = data.companyUuid

      if (!await companyService.hasSufficientCredits(companyId, cost)) {
        throw new Error('Company does not have enough credits');
      }

      await companyService.deductCredits(companyId, cost);
    }

    return super.create(data, params);
  }
}

export const getOptions = (app: Application): KnexAdapterOptions & { app: Application } => {
  return {
    id: 'uuid',
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'payment',
    app: app
  };
};
