// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  analysisDataValidator,
  analysisPatchValidator,
  analysisQueryValidator,
  analysisResolver,
  analysisExternalResolver,
  analysisDataResolver,
  analysisPatchResolver,
  analysisQueryResolver
} from './analysis.schema'

import type { Application } from '../../declarations'
import { AnalysisService, getOptions } from './analysis.class'
import { analysisPath, analysisMethods } from './analysis.shared'

export * from './analysis.class'
export * from './analysis.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const analysis = (app: Application) => {
  // Register our service on the Feathers application
  app.use(analysisPath, new AnalysisService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: analysisMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(analysisPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(analysisExternalResolver),
        schemaHooks.resolveResult(analysisResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(analysisQueryValidator),
        schemaHooks.resolveQuery(analysisQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(analysisDataValidator),
        schemaHooks.resolveData(analysisDataResolver)
      ],
      patch: [
        schemaHooks.validateData(analysisPatchValidator),
        schemaHooks.resolveData(analysisPatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [analysisPath]: AnalysisService
  }
}
