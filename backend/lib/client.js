"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = void 0;
// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
const feathers_1 = require("@feathersjs/feathers");
const authentication_client_1 = __importDefault(require("@feathersjs/authentication-client"));
const analysis_shared_1 = require("./services/analysis/analysis.shared");
const payment_shared_1 = require("./services/payment/payment.shared");
const project_shared_1 = require("./services/project/project.shared");
const companies_shared_1 = require("./services/companies/companies.shared");
const users_shared_1 = require("./services/users/users.shared");
/**
 * Returns a typed client for the openend-io app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
const createClient = (connection, authenticationOptions = {}) => {
    const client = (0, feathers_1.feathers)();
    client.configure(connection);
    client.configure((0, authentication_client_1.default)(authenticationOptions));
    client.set('connection', connection);
    client.configure(users_shared_1.userClient);
    client.configure(companies_shared_1.companiesClient);
    client.configure(project_shared_1.projectClient);
    client.configure(payment_shared_1.paymentClient);
    client.configure(analysis_shared_1.analysisClient);
    return client;
};
exports.createClient = createClient;
//# sourceMappingURL=client.js.map