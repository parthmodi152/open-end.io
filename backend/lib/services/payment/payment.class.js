"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptions = exports.PaymentService = void 0;
const knex_1 = require("@feathersjs/knex");
// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
class PaymentService extends knex_1.KnexService {
}
exports.PaymentService = PaymentService;
const getOptions = (app) => {
    return {
        id: 'uuid',
        paginate: app.get('paginate'),
        Model: app.get('postgresqlClient'),
        name: 'payment'
    };
};
exports.getOptions = getOptions;
//# sourceMappingURL=payment.class.js.map