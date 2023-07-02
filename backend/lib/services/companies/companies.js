"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.companies = void 0;
// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
const schema_1 = require("@feathersjs/schema");
const companies_schema_1 = require("./companies.schema");
const companies_class_1 = require("./companies.class");
const companies_shared_1 = require("./companies.shared");
const feathers_swagger_1 = require("feathers-swagger");
__exportStar(require("./companies.class"), exports);
__exportStar(require("./companies.schema"), exports);
// A configure function that registers the service and its hooks via `app.configure`
const companies = (app) => {
    // Register our service on the Feathers application
    app.use(companies_shared_1.companiesPath, new companies_class_1.CompaniesService((0, companies_class_1.getOptions)(app)), {
        // A list of all methods this service exposes externally
        methods: companies_shared_1.companiesMethods,
        // You can add additional custom events to be sent to clients here
        events: [],
        docs: (0, feathers_swagger_1.createSwaggerServiceOptions)({
            schemas: {
                companiesDataSchema: companies_schema_1.companiesDataSchema,
                companiesQuerySchema: companies_schema_1.companiesQuerySchema,
                companiesSchema: companies_schema_1.companiesSchema,
                companiesPatchSchema: companies_schema_1.companiesPatchSchema,
            },
            docs: {
                description: 'Companies management service',
                securities: ['all'],
                idType: 'string',
            },
        }),
    });
    // Initialize hooks
    app.service(companies_shared_1.companiesPath).hooks({
        around: {
            all: [
                //authenticate('jwt'),
                schema_1.hooks.resolveExternal(companies_schema_1.companiesExternalResolver),
                schema_1.hooks.resolveResult(companies_schema_1.companiesResolver),
            ],
        },
        before: {
            all: [
                schema_1.hooks.validateQuery(companies_schema_1.companiesQueryValidator),
                schema_1.hooks.resolveQuery(companies_schema_1.companiesQueryResolver),
            ],
            find: [],
            get: [],
            create: [
                schema_1.hooks.validateData(companies_schema_1.companiesDataValidator),
                schema_1.hooks.resolveData(companies_schema_1.companiesDataResolver),
            ],
            patch: [
                schema_1.hooks.validateData(companies_schema_1.companiesPatchValidator),
                schema_1.hooks.resolveData(companies_schema_1.companiesPatchResolver),
            ],
            remove: [],
        },
        after: {
            all: [],
        },
        error: {
            all: [],
        },
    });
};
exports.companies = companies;
//# sourceMappingURL=companies.js.map