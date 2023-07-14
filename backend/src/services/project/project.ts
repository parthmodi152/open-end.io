// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from "@feathersjs/authentication";

import { hooks as schemaHooks } from "@feathersjs/schema";

import {
  projectDataResolver,
  projectDataSchema,
  projectDataValidator,
  projectExternalResolver,
  projectPatchResolver,
  projectPatchSchema,
  projectPatchValidator,
  projectQueryResolver,
  projectQuerySchema,
  projectQueryValidator,
  projectResolver,
  projectSchema,
} from "./project.schema";

import type { Application } from '../../declarations';
import { getOptions, ProjectService } from './project.class';
import { projectMethods, projectPath } from './project.shared';
import { createSwaggerServiceOptions } from 'feathers-swagger';
import Multer from 'koa-multer';
import {HookContext, NextFunction} from '@feathersjs/feathers';
import fs from 'fs';
import csv from 'csv-parser';
const multipartMiddleware = Multer({
  limits: { fieldSize: Infinity, files: 1 }
});
export * from './project.class';
export * from './project.schema';

// A configure function that registers the service and its hooks via `app.configure`
export const project = (app: Application) => {
  // const upload = multer(); // note you can pass `multer` options here
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
        idType: 'string',
        description: 'User management service',
        securities: ['all'],
        operations: {
          create: {
            description: 'Create new media upload',
            requestBody: {
              content: {
                'multipart/form-data': {
                  schema: projectDataSchema,
                },
              },
            },
          },
        },
      },
    }),
    koa: {
      before: [
        async (ctx, next) => {
          if (ctx.method === 'POST') { // Apply middleware only for "create" (POST) operation
            await multipartMiddleware.single('uploadCsv')(ctx, async () => {
              // @ts-ignore
              ctx.feathers.file = ctx.req.file;

              // @ts-ignore
              ctx.request.body = ctx.req.body;
              delete ctx.request.body.uploadCsv;

              try {
                ctx.request.body.config = JSON.parse(ctx.request.body.config);
              } catch (error) {
                if (typeof ctx.request.body.config !== 'object' || ctx.request.body.config === null) {
                  throw error;
                }
             }

              if (ctx.request.body.isArchive === 'true') {
                  ctx.request.body.isArchive = true;
                } else if (ctx.request.body.isArchive === 'false') {
                  ctx.request.body.isArchive = false;
                } 
              await next();
            });
            
          } else {
            await next();
          }
        },
      ],
    }
  });
  // Initialize hooks
  app.service(projectPath).hooks({
    around: {
      all: [
        //authenticate('jwt'),
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
