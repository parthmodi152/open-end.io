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
exports.project = void 0;
const schema_1 = require("@feathersjs/schema");
const project_schema_1 = require("./project.schema");
const project_class_1 = require("./project.class");
const project_shared_1 = require("./project.shared");
const feathers_swagger_1 = require("feathers-swagger");
__exportStar(require("./project.class"), exports);
__exportStar(require("./project.schema"), exports);
// A configure function that registers the service and its hooks via `app.configure`
const project = (app) => {
    // Register our service on the Feathers application
    app.use(project_shared_1.projectPath, new project_class_1.ProjectService((0, project_class_1.getOptions)(app)), {
        // A list of all methods this service exposes externally
        methods: project_shared_1.projectMethods,
        // You can add additional custom events to be sent to clients here
        events: [],
        docs: (0, feathers_swagger_1.createSwaggerServiceOptions)({
            schemas: {
                projectDataSchema: project_schema_1.projectDataSchema,
                projectQuerySchema: project_schema_1.projectQuerySchema,
                projectSchema: project_schema_1.projectSchema,
                projectPatchSchema: project_schema_1.projectPatchSchema,
            },
            docs: {
                idType: "string",
                description: "User management service",
                securities: ["all"],
            },
        }),
    });
    // Initialize hooks
    app.service(project_shared_1.projectPath).hooks({
        around: {
            all: [
                //authenticate('jwt'),
                schema_1.hooks.resolveExternal(project_schema_1.projectExternalResolver),
                schema_1.hooks.resolveResult(project_schema_1.projectResolver),
            ],
        },
        before: {
            all: [
                schema_1.hooks.validateQuery(project_schema_1.projectQueryValidator),
                schema_1.hooks.resolveQuery(project_schema_1.projectQueryResolver),
            ],
            find: [],
            get: [],
            create: [
                schema_1.hooks.validateData(project_schema_1.projectDataValidator),
                schema_1.hooks.resolveData(project_schema_1.projectDataResolver),
            ],
            patch: [
                schema_1.hooks.validateData(project_schema_1.projectPatchValidator),
                schema_1.hooks.resolveData(project_schema_1.projectPatchResolver),
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
exports.project = project;
//# sourceMappingURL=project.js.map