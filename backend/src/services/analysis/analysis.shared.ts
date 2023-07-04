// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Analysis, AnalysisData, AnalysisPatch, AnalysisQuery, AnalysisService } from './analysis.class'

export type { Analysis, AnalysisData, AnalysisPatch, AnalysisQuery }

export type AnalysisClientService = Pick<
  AnalysisService<Params<AnalysisQuery>>,
  (typeof analysisMethods)[number]
>

export const analysisPath = 'analysis'

export const analysisMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const analysisClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(analysisPath, connection.service(analysisPath), {
    methods: analysisMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [analysisPath]: AnalysisClientService
  }
}
