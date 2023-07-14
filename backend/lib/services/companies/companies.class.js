"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptions = exports.CompaniesService = void 0;
const knex_1 = require("@feathersjs/knex");
// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
class CompaniesService extends knex_1.KnexService {
    async hasSufficientCredits(companyId, requiredCredits) {
        const company = await this.get(companyId);
        return company.credit >= requiredCredits;
    }
    async deductCredits(companyId, credits) {
        const company = await this.get(companyId);
        company.credit -= credits;
        await this.update(companyId, company);
    }
}
exports.CompaniesService = CompaniesService;
const getOptions = (app) => {
    return {
        id: 'uuid',
        paginate: app.get('paginate'),
        Model: app.get('postgresqlClient'),
        name: 'companies'
    };
};
exports.getOptions = getOptions;
//# sourceMappingURL=companies.class.js.map