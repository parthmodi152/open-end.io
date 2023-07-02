"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companiesQueryResolver = exports.companiesQueryValidator = exports.companiesQuerySchema = exports.companiesQueryProperties = exports.companiesPatchResolver = exports.companiesPatchValidator = exports.companiesPatchSchema = exports.companiesDataResolver = exports.companiesDataValidator = exports.companiesDataSchema = exports.companiesExternalResolver = exports.companiesResolver = exports.companiesValidator = exports.companiesSchema = void 0;
// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
const schema_1 = require("@feathersjs/schema");
const typebox_1 = require("@feathersjs/typebox");
const validators_1 = require("../../validators");
// Main data model schema
exports.companiesSchema = typebox_1.Type.Object({
    uuid: typebox_1.Type.String(),
    name: typebox_1.Type.String(),
    credit: typebox_1.Type.Number(),
}, { $id: 'Companies', additionalProperties: false });
exports.companiesValidator = (0, typebox_1.getValidator)(exports.companiesSchema, validators_1.dataValidator);
exports.companiesResolver = (0, schema_1.resolve)({});
exports.companiesExternalResolver = (0, schema_1.resolve)({});
// Schema for creating new entries
exports.companiesDataSchema = typebox_1.Type.Pick(exports.companiesSchema, ['name', 'credit'], {
    $id: 'CompaniesData',
});
exports.companiesDataValidator = (0, typebox_1.getValidator)(exports.companiesDataSchema, validators_1.dataValidator);
exports.companiesDataResolver = (0, schema_1.resolve)({});
// Schema for updating existing entries
exports.companiesPatchSchema = typebox_1.Type.Partial(typebox_1.Type.Pick(exports.companiesSchema, ['name', 'credit']), {
    $id: 'CompaniesPatch',
});
exports.companiesPatchValidator = (0, typebox_1.getValidator)(exports.companiesPatchSchema, validators_1.dataValidator);
exports.companiesPatchResolver = (0, schema_1.resolve)({});
// Schema for allowed query properties
exports.companiesQueryProperties = typebox_1.Type.Pick(exports.companiesSchema, [
    'uuid',
    'name',
]);
exports.companiesQuerySchema = typebox_1.Type.Intersect([
    (0, typebox_1.querySyntax)(exports.companiesQueryProperties),
    // Add additional query properties here
    typebox_1.Type.Object({
        creditsMoreThan: typebox_1.Type.Optional(typebox_1.Type.Number({ minimum: 0 })),
    }, { additionalProperties: false }),
], { additionalProperties: false });
exports.companiesQueryValidator = (0, typebox_1.getValidator)(exports.companiesQuerySchema, validators_1.queryValidator);
exports.companiesQueryResolver = (0, schema_1.resolve)({});
//# sourceMappingURL=companies.schema.js.map