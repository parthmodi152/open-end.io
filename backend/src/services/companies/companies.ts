// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { hooks as schemaHooks } from '@feathersjs/schema';

import {
  companiesDataResolver,
  companiesDataSchema,
  companiesDataValidator,
  companiesExternalResolver,
  companiesPatchResolver,
  companiesPatchSchema,
  companiesPatchValidator,
  companiesQueryResolver,
  companiesQuerySchema,
  companiesQueryValidator,
  companiesResolver,
  companiesSchema,
} from './companies.schema';

import type { Application } from '../../declarations';
import { CompaniesService, getOptions } from './companies.class';
import { companiesMethods, companiesPath } from './companies.shared';
import { createSwaggerServiceOptions } from 'feathers-swagger';

export * from './companies.class';
export * from './companies.schema';

// A configure function that registers the service and its hooks via `app.configure`
export const companies = (app: Application) => {
  // Register our service on the Feathers application
  app.use(companiesPath, new CompaniesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: companiesMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
    docs: createSwaggerServiceOptions({
      schemas: {
        companiesDataSchema,
        companiesQuerySchema,
        companiesSchema,
        companiesPatchSchema,
      },
      docs: {
        description: 'Companies management service',
        securities: ['all'],
        idType: 'string',
      },
    }),
  });
  // Initialize hooks
  app.service(companiesPath).hooks({
    around: {
      all: [
        //authenticate('jwt'),
        schemaHooks.resolveExternal(companiesExternalResolver),
        schemaHooks.resolveResult(companiesResolver),
      ],
    },
    before: {
      all: [
        schemaHooks.validateQuery(companiesQueryValidator),
        schemaHooks.resolveQuery(companiesQueryResolver),
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(companiesDataValidator),
        schemaHooks.resolveData(companiesDataResolver),
      ],
      patch: [
        schemaHooks.validateData(companiesPatchValidator),
        schemaHooks.resolveData(companiesPatchResolver),
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
declare module '../../declarations' {
  interface ServiceTypes {
    [companiesPath]: CompaniesService;
  }
}
