// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication';

import { hooks as schemaHooks } from '@feathersjs/schema';

import {
  paymentDataValidator,
  paymentPatchValidator,
  paymentQueryValidator,
  paymentResolver,
  paymentExternalResolver,
  paymentDataResolver,
  paymentPatchResolver,
  paymentQueryResolver,
  paymentSchema,
  paymentDataSchema,
  paymentPatchSchema,
  paymentQuerySchema,
} from './payment.schema';

import type { Application } from '../../declarations';
import { PaymentService, getOptions } from './payment.class';
import { paymentPath, paymentMethods } from './payment.shared';
import { createSwaggerServiceOptions} from 'feathers-swagger';

export * from './payment.class';
export * from './payment.schema';

// A configure function that registers the service and its hooks via `app.configure`
export const payment = (app: Application) => {
  // Register our service on the Feathers application
  app.use(paymentPath, new PaymentService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: paymentMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
    docs: createSwaggerServiceOptions({
      schemas: {paymentDataSchema, paymentPatchSchema, paymentQuerySchema, paymentSchema},
      docs: {
        description: 'A service to manage payments',
        securities: ['all'],
        idType: 'string',
      }
    })
  });
  // Initialize hooks
  app.service(paymentPath).hooks({
    around: {
      all: [
        //authenticate('jwt'),
        schemaHooks.resolveExternal(paymentExternalResolver),
        schemaHooks.resolveResult(paymentResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(paymentQueryValidator), schemaHooks.resolveQuery(paymentQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(paymentDataValidator), schemaHooks.resolveData(paymentDataResolver)],
      patch: [schemaHooks.validateData(paymentPatchValidator), schemaHooks.resolveData(paymentPatchResolver)],
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

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [paymentPath]: PaymentService
  }
}
