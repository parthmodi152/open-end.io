import type { Application } from '../../declarations';
import { PaymentService } from './payment.class';
import { paymentPath } from './payment.shared';
export * from './payment.class';
export * from './payment.schema';
export declare const payment: (app: Application) => void;
declare module '../../declarations' {
    interface ServiceTypes {
        [paymentPath]: PaymentService;
    }
}
