import type { Application } from "../../declarations";
import { ProjectService } from "./project.class";
import { projectPath } from "./project.shared";
export * from "./project.class";
export * from "./project.schema";
export declare const project: (app: Application) => void;
declare module "../../declarations" {
    interface ServiceTypes {
        [projectPath]: ProjectService;
    }
}
