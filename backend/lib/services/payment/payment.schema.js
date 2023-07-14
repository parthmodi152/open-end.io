"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentQueryResolver = exports.paymentQueryValidator = exports.paymentQuerySchema = exports.paymentQueryProperties = exports.paymentPatchResolver = exports.paymentPatchValidator = exports.paymentPatchSchema = exports.paymentDataResolver = exports.paymentDataValidator = exports.paymentDataSchema = exports.paymentExternalResolver = exports.paymentResolver = exports.paymentValidator = exports.paymentSchema = void 0;
// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
const schema_1 = require("@feathersjs/schema");
const typebox_1 = require("@feathersjs/typebox");
const validators_1 = require("../../validators");
// Main data model schema
exports.paymentSchema = typebox_1.Type.Object({
    uuid: typebox_1.Type.String({ format: 'uuid' }),
    type: typebox_1.Type.Optional(typebox_1.Type.String()),
    companyUuid: typebox_1.Type.String({ format: 'uuid' }),
    userUuid: typebox_1.Type.String({ format: 'uuid' }),
    amount: typebox_1.Type.Number(),
    balance: typebox_1.Type.Number(),
}, { $id: 'Payment', additionalProperties: false });
exports.paymentValidator = (0, typebox_1.getValidator)(exports.paymentSchema, validators_1.dataValidator);
exports.paymentResolver = (0, schema_1.resolve)({});
exports.paymentExternalResolver = (0, schema_1.resolve)({});
// Schema for creating new entries
exports.paymentDataSchema = typebox_1.Type.Pick(exports.paymentSchema, ['type', 'companyUuid', 'userUuid', 'amount', 'balance'], {
    $id: 'PaymentData'
});
exports.paymentDataValidator = (0, typebox_1.getValidator)(exports.paymentDataSchema, validators_1.dataValidator);
exports.paymentDataResolver = (0, schema_1.resolve)({});
// Schema for updating existing entries
exports.paymentPatchSchema = typebox_1.Type.Partial(exports.paymentSchema, {
    $id: 'PaymentPatch'
});
exports.paymentPatchValidator = (0, typebox_1.getValidator)(exports.paymentPatchSchema, validators_1.dataValidator);
exports.paymentPatchResolver = (0, schema_1.resolve)({});
// Schema for allowed query properties
exports.paymentQueryProperties = typebox_1.Type.Pick(exports.paymentSchema, [
    'uuid',
    'companyUuid',
    'userUuid'
]);
exports.paymentQuerySchema = typebox_1.Type.Intersect([
    (0, typebox_1.querySyntax)(exports.paymentQueryProperties),
    // Add additional query properties here
    typebox_1.Type.Object({}, { additionalProperties: false })
], { additionalProperties: false });
exports.paymentQueryValidator = (0, typebox_1.getValidator)(exports.paymentQuerySchema, validators_1.queryValidator);
exports.paymentQueryResolver = (0, schema_1.resolve)({});
//# sourceMappingURL=payment.schema.js.map