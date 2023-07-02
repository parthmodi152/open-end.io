import type { Params } from '@feathersjs/feathers';
import type { ClientApplication } from '../../client';
import type { Payment, PaymentData, PaymentPatch, PaymentQuery, PaymentService } from './payment.class';
export type { Payment, PaymentData, PaymentPatch, PaymentQuery };
export type PaymentClientService = Pick<PaymentService<Params<PaymentQuery>>, (typeof paymentMethods)[number]>;
export declare const paymentPath = "payment";
export declare const paymentMethods: readonly ["find", "get", "create", "patch", "remove"];
export declare const paymentClient: (client: ClientApplication) => void;
declare module '../../client' {
    interface ServiceTypes {
        [paymentPath]: PaymentClientService;
    }
}
