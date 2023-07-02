"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.services = void 0;
const payment_1 = require("./payment/payment");
const project_1 = require("./project/project");
const companies_1 = require("./companies/companies");
const users_1 = require("./users/users");
const services = (app) => {
    app.configure(payment_1.payment);
    app.configure(project_1.project);
    app.configure(companies_1.companies);
    app.configure(users_1.user);
    // All services will be registered here
};
exports.services = services;
//# sourceMappingURL=index.js.map