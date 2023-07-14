/// <reference types="multer" />
import type { KnexAdapterOptions } from '@feathersjs/knex';
import type { Application } from '../../declarations';
import type { Project, ProjectData, ProjectPatch, ProjectQuery } from './project.schema';
import { AuthenticatedParams, BaseService } from '../BaseService';
export type { Project, ProjectData, ProjectPatch, ProjectQuery };
export interface ProjectParams extends AuthenticatedParams {
    file?: Express.Multer.File;
}
export declare class ProjectService extends BaseService {
    constructor(options: KnexAdapterOptions & {
        app: Application;
    });
    create(data: ProjectData, params?: ProjectParams): Promise<Project>;
    create(data: ProjectData[], params?: ProjectParams): Promise<Project[]>;
    private processFileUpload;
}
export declare const getOptions: (app: Application) => KnexAdapterOptions & {
    app: Application;
};
