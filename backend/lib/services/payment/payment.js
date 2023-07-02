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
exports.payment = void 0;
const schema_1 = require("@feathersjs/schema");
const payment_schema_1 = require("./payment.schema");
const payment_class_1 = require("./payment.class");
const payment_shared_1 = require("./payment.shared");
const feathers_swagger_1 = require("feathers-swagger");
__exportStar(require("./payment.class"), exports);
__exportStar(require("./payment.schema"), exports);
// A configure function that registers the service and its hooks via `app.configure`
const payment = (app) => {
    // Register our service on the Feathers application
    app.use(payment_shared_1.paymentPath, new payment_class_1.PaymentService((0, payment_class_1.getOptions)(app)), {
        // A list of all methods this service exposes externally
        methods: payment_shared_1.paymentMethods,
        // You can add additional custom events to be sent to clients here
        events: [],
        docs: (0, feathers_swagger_1.createSwaggerServiceOptions)({
            schemas: { paymentDataSchema: payment_schema_1.paymentDataSchema, paymentPatchSchema: payment_schema_1.paymentPatchSchema, paymentQuerySchema: payment_schema_1.paymentQuerySchema, paymentSchema: payment_schema_1.paymentSchema },
            docs: {
                description: 'A service to manage payments',
                securities: ['all'],
                idType: 'string',
            }
        })
    });
    // Initialize hooks
    app.service(payment_shared_1.paymentPath).hooks({
        around: {
            all: [
                //authenticate('jwt'),
                schema_1.hooks.resolveExternal(payment_schema_1.paymentExternalResolver),
                schema_1.hooks.resolveResult(payment_schema_1.paymentResolver)
            ]
        },
        before: {
            all: [schema_1.hooks.validateQuery(payment_schema_1.paymentQueryValidator), schema_1.hooks.resolveQuery(payment_schema_1.paymentQueryResolver)],
            find: [],
            get: [],
            create: [schema_1.hooks.validateData(payment_schema_1.paymentDataValidator), schema_1.hooks.resolveData(payment_schema_1.paymentDataResolver)],
            patch: [schema_1.hooks.validateData(payment_schema_1.paymentPatchValidator), schema_1.hooks.resolveData(payment_schema_1.paymentPatchResolver)],
            remove: []
        },
        after: {
            all: []
        },
        error: {
            all: []
        }
    });
};
exports.payment = payment;
//# sourceMappingURL=payment.js.map