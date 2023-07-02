import type { Params } from '@feathersjs/feathers';
import { KnexService } from '@feathersjs/knex';
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex';
import type { Application } from '../../declarations';
import type { Project, ProjectData, ProjectPatch, ProjectQuery } from './project.schema';
export type { Project, ProjectData, ProjectPatch, ProjectQuery };
export interface ProjectParams extends KnexAdapterParams<ProjectQuery> {
}
export declare class ProjectService<ServiceParams extends Params = ProjectParams> extends KnexService<Project, ProjectData, ProjectParams, ProjectPatch> {
}
export declare const getOptions: (app: Application) => KnexAdapterOptions;
