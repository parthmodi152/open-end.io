"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companiesClient = exports.companiesMethods = exports.companiesPath = void 0;
exports.companiesPath = 'companies';
exports.companiesMethods = ['find', 'get', 'create', 'patch', 'remove'];
const companiesClient = (client) => {
    const connection = client.get('connection');
    client.use(exports.companiesPath, connection.service(exports.companiesPath), {
        methods: exports.companiesMethods
    });
};
exports.companiesClient = companiesClient;
//# sourceMappingURL=companies.shared.js.map