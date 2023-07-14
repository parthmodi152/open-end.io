"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptions = exports.PaymentService = void 0;
const BaseService_1 = require("../BaseService");
// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
class PaymentService extends BaseService_1.BaseService {
    constructor(options) {
        super(options, options.app);
    }
    async create(data, params) {
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
        }
        else {
            // If data is an object
            const companyId = data.companyUuid;
            if (!await companyService.hasSufficientCredits(companyId, cost)) {
                throw new Error('Company does not have enough credits');
            }
            await companyService.deductCredits(companyId, cost);
        }
        return super.create(data, params);
    }
}
exports.PaymentService = PaymentService;
const getOptions = (app) => {
    return {
        id: 'uuid',
        paginate: app.get('paginate'),
        Model: app.get('postgresqlClient'),
        name: 'payment',
        app: app
    };
};
exports.getOptions = getOptions;
//# sourceMappingURL=payment.class.js.map