// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from "@feathersjs/authentication";

import { hooks as schemaHooks } from "@feathersjs/schema";

import {
  projectDataResolver,
  projectDataSchema,
  projectDataValidator,
  projectExternalResolver,
  projectPatchSchema,
  projectPatchResolver,
  projectPatchValidator,
  projectQueryResolver,
  projectQuerySchema,
  projectQueryValidator,
  projectResolver,
  projectSchema,
} from "./project.schema";

import type { Application } from "../../declarations";
import { ProjectService, getOptions } from "./project.class";
import { projectPath, projectMethods } from "./project.shared";
import { createSwaggerServiceOptions } from "feathers-swagger";

export * from "./project.class";
export * from "./project.schema";

// A configure function that registers the service and its hooks via `app.configure`
export const project = (app: Application) => {
  // Register our service on the Feathers application
  app.use(projectPath, new ProjectService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: projectMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
    docs: createSwaggerServiceOptions({
      schemas: {
        projectDataSchema,
        projectQuerySchema,
        projectSchema,
        projectPatchSchema,
      },
      docs: {
        idType: "string",
        description: "User management service",
        securities: ["all"],
      },
    }),
  });
  // Initialize hooks
  app.service(projectPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(projectExternalResolver),
        schemaHooks.resolveResult(projectResolver),
      ],
    },
    before: {
      all: [
        schemaHooks.validateQuery(projectQueryValidator),
        schemaHooks.resolveQuery(projectQueryResolver),
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(projectDataValidator),
        schemaHooks.resolveData(projectDataResolver),
      ],
      patch: [
        schemaHooks.validateData(projectPatchValidator),
        schemaHooks.resolveData(projectPatchResolver),
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

// Add this service to the service type index
declare module "../../declarations" {
  interface ServiceTypes {
    [projectPath]: ProjectService;
  }
}
