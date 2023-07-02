// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers';
import type { ClientApplication } from '../../client';
import type { Payment, PaymentData, PaymentPatch, PaymentQuery, PaymentService } from './payment.class';

export type { Payment, PaymentData, PaymentPatch, PaymentQuery };

export type PaymentClientService = Pick<PaymentService<Params<PaymentQuery>>, (typeof paymentMethods)[number]>

export const paymentPath = 'payment';

export const paymentMethods = ['find', 'get', 'create', 'patch', 'remove'] as const;

export const paymentClient = (client: ClientApplication) => {
  const connection = client.get('connection');

  client.use(paymentPath, connection.service(paymentPath), {
    methods: paymentMethods
  });
};

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [paymentPath]: PaymentClientService
  }
}
