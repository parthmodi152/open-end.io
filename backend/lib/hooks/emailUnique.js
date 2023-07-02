"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailUnique = void 0;
const errors_1 = require("@feathersjs/errors");
const emailUnique = async (context) => {
    const { email } = context.data;
    const knex = context.app.get('postgresqlClient');
    if (email) {
        const user = await knex.select('uuid').from('users').where('email', email);
        console.log('>>> user exists? ', user);
        if (user.length > 0) {
            throw new errors_1.Forbidden('User already exists');
        }
    }
};
exports.emailUnique = emailUnique;
//# sourceMappingURL=emailUnique.js.map