// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const analysisSchema = Type.Object(
  {
    orderId: Type.String({ format: 'uuid' }),
    projectId: Type.String({ format: 'uuid' }),
    creditsUsed: Type.Number(),
    startedBy: Type.String({ format: 'uuid' }),
    startedAt: Type.String({ format: 'date-time' }),
    status: Type.Boolean()
  },
  { $id: 'Analysis', additionalProperties: false }
)
export type Analysis = Static<typeof analysisSchema>
export const analysisValidator = getValidator(analysisSchema, dataValidator)
export const analysisResolver = resolve<Analysis, HookContext>({})

export const analysisExternalResolver = resolve<Analysis, HookContext>({})

// Schema for creating new entries
export const analysisDataSchema = Type.Pick(analysisSchema, ['projectId', 'creditsUsed', 'startedBy'], {
  $id: 'AnalysisData'
})
export type AnalysisData = Static<typeof analysisDataSchema>
export const analysisDataValidator = getValidator(analysisDataSchema, dataValidator)
export const analysisDataResolver = resolve<Analysis, HookContext>({})

// Schema for updating existing entries
export const analysisPatchSchema = Type.Partial(analysisSchema, {
  $id: 'AnalysisPatch'
})
export type AnalysisPatch = Static<typeof analysisPatchSchema>
export const analysisPatchValidator = getValidator(analysisPatchSchema, dataValidator)
export const analysisPatchResolver = resolve<Analysis, HookContext>({})

// Schema for allowed query properties
export const analysisQueryProperties = Type.Pick(analysisSchema, ['orderId', 'projectId', 'startedBy'])
export const analysisQuerySchema = Type.Intersect(
  [
    querySyntax(analysisQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type AnalysisQuery = Static<typeof analysisQuerySchema>
export const analysisQueryValidator = getValidator(analysisQuerySchema, queryValidator)
export const analysisQueryResolver = resolve<AnalysisQuery, HookContext>({})
