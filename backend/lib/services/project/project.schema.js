"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectQueryResolver = exports.projectQueryValidator = exports.projectQuerySchema = exports.projectQueryProperties = exports.projectPatchResolver = exports.projectPatchValidator = exports.projectPatchSchema = exports.projectDataResolver = exports.projectDataValidator = exports.projectDataSchema = exports.projectExternalResolver = exports.projectResolver = exports.projectValidator = exports.projectSchema = void 0;
// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
const schema_1 = require("@feathersjs/schema");
const typebox_1 = require("@feathersjs/typebox");
const validators_1 = require("../../validators");
// Main data model schema
exports.projectSchema = typebox_1.Type.Object({
    uuid: typebox_1.Type.String(),
    name: typebox_1.Type.String(),
    description: typebox_1.Type.Optional(typebox_1.Type.String()),
    config: typebox_1.Type.Optional(typebox_1.Type.Object({}, { additionalProperties: true })),
    ownerUuid: typebox_1.Type.String({ format: 'uuid' }),
}, { $id: 'Project', additionalProperties: false });
exports.projectValidator = (0, typebox_1.getValidator)(exports.projectSchema, validators_1.dataValidator);
exports.projectResolver = (0, schema_1.resolve)({});
exports.projectExternalResolver = (0, schema_1.resolve)({});
// Schema for creating new entries
exports.projectDataSchema = typebox_1.Type.Pick(exports.projectSchema, ['name', 'description', 'config', 'ownerUuid'], {
    $id: 'ProjectData',
});
exports.projectDataValidator = (0, typebox_1.getValidator)(exports.projectDataSchema, validators_1.dataValidator);
exports.projectDataResolver = (0, schema_1.resolve)({});
// Schema for updating existing entries
exports.projectPatchSchema = typebox_1.Type.Partial(exports.projectSchema, {
    $id: 'ProjectPatch',
});
exports.projectPatchValidator = (0, typebox_1.getValidator)(exports.projectPatchSchema, validators_1.dataValidator);
exports.projectPatchResolver = (0, schema_1.resolve)({});
// Schema for allowed query properties
exports.projectQueryProperties = typebox_1.Type.Pick(exports.projectSchema, [
    'uuid',
    'name',
    'ownerUuid',
]);
exports.projectQuerySchema = typebox_1.Type.Intersect([
    (0, typebox_1.querySyntax)(exports.projectQueryProperties),
    // Add additional query properties here
    typebox_1.Type.Object({}, { additionalProperties: false }),
], { additionalProperties: false });
exports.projectQueryValidator = (0, typebox_1.getValidator)(exports.projectQuerySchema, validators_1.queryValidator);
exports.projectQueryResolver = (0, schema_1.resolve)({});
//# sourceMappingURL=project.schema.js.map