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
exports.user = void 0;
// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
const schema_1 = require("@feathersjs/schema");
const users_schema_1 = require("./users.schema");
const users_class_1 = require("./users.class");
const users_shared_1 = require("./users.shared");
const feathers_swagger_1 = require("feathers-swagger");
const emailUnique_1 = require("../../hooks/emailUnique");
const check_company_exists_1 = require("../../hooks/check-company-exists");
__exportStar(require("./users.class"), exports);
__exportStar(require("./users.schema"), exports);
// A configure function that registers the service and its hooks via `app.configure`
const user = (app) => {
    // Register our service on the Feathers application
    app.use(users_shared_1.userPath, new users_class_1.UserService((0, users_class_1.getOptions)(app)), {
        // A list of all methods this service exposes externally
        methods: users_shared_1.userMethods,
        // You can add additional custom events to be sent to clients here
        events: [],
        docs: (0, feathers_swagger_1.createSwaggerServiceOptions)({
            schemas: { userDataSchema: users_schema_1.userDataSchema, userQuerySchema: users_schema_1.userQuerySchema, userSchema: users_schema_1.userSchema },
            docs: {
                idType: 'string',
                description: 'User management service',
                securities: ['all'],
            },
        }),
    });
    // Initialize hooks
    app.service(users_shared_1.userPath).hooks({
        around: {
            all: [
                schema_1.hooks.resolveExternal(users_schema_1.userExternalResolver),
                schema_1.hooks.resolveResult(users_schema_1.userResolver),
            ],
            find: [
            //TODO: turn on tha auth when we are ready
            //authenticate('jwt')
            ],
            get: [],
            create: [],
            update: [],
            patch: [],
            remove: [],
        },
        before: {
            all: [
                schema_1.hooks.validateQuery(users_schema_1.userQueryValidator),
                schema_1.hooks.resolveQuery(users_schema_1.userQueryResolver),
            ],
            find: [],
            get: [],
            create: [
                schema_1.hooks.validateData(users_schema_1.userDataValidator),
                schema_1.hooks.resolveData(users_schema_1.userDataResolver),
                emailUnique_1.emailUnique,
                check_company_exists_1.checkCompanyExists
            ],
            patch: [
                schema_1.hooks.validateData(users_schema_1.userPatchValidator),
                schema_1.hooks.resolveData(users_schema_1.userPatchResolver),
                emailUnique_1.emailUnique,
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
exports.user = user;
//# sourceMappingURL=users.js.map