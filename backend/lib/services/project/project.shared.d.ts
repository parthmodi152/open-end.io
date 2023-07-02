import type { Params } from '@feathersjs/feathers';
import type { ClientApplication } from '../../client';
import type { Project, ProjectData, ProjectPatch, ProjectQuery, ProjectService } from './project.class';
export type { Project, ProjectData, ProjectPatch, ProjectQuery };
export type ProjectClientService = Pick<ProjectService<Params<ProjectQuery>>, (typeof projectMethods)[number]>;
export declare const projectPath = "project";
export declare const projectMethods: readonly ["find", "get", "create", "patch", "remove"];
export declare const projectClient: (client: ClientApplication) => void;
declare module '../../client' {
    interface ServiceTypes {
        [projectPath]: ProjectClientService;
    }
}
