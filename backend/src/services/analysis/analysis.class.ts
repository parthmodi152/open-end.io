// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Analysis, AnalysisData, AnalysisPatch, AnalysisQuery } from './analysis.schema'

export type { Analysis, AnalysisData, AnalysisPatch, AnalysisQuery }

export interface AnalysisParams extends KnexAdapterParams<AnalysisQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class AnalysisService<ServiceParams extends Params = AnalysisParams> extends KnexService<
  Analysis,
  AnalysisData,
  AnalysisParams,
  AnalysisPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'analysis'
  }
}
