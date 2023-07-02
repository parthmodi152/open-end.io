"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptions = exports.UserService = void 0;
const knex_1 = require("@feathersjs/knex");
// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
class UserService extends knex_1.KnexService {
    constructor(options) {
        super(options);
    }
    async create(data, params) {
        // Additional actions on user creation
        const userData = await super.create(data, params);
        if (userData && userData.companyUuid) {
            const company = await this.Model('companies')
                .where({ uuid: userData.companyUuid })
                .first();
            if (company) {
                await this.Model('companies').where({ uuid: company.uuid }).update({
                    credit: parseInt(company.credit.toString()),
                });
            }
        }
        return userData;
    }
}
exports.UserService = UserService;
const getOptions = (app) => {
    return {
        id: 'uuid',
        paginate: app.get('paginate'),
        Model: app.get('postgresqlClient'),
        name: 'users',
    };
};
exports.getOptions = getOptions;
//# sourceMappingURL=users.class.js.map