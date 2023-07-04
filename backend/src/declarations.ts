// For more information about this file see https://dove.feathersjs.com/guides/cli/typescript.html
import {
  HookContext as FeathersHookContext,
  NextFunction,
} from '@feathersjs/feathers';
import { Application as FeathersApplication } from '@feathersjs/koa';
import { ApplicationConfiguration } from './configuration';

import { User } from './services/users/users';
import { ServiceSwaggerOptions } from 'feathers-swagger';
import { projectPath } from './services/project/project.shared';
import { ProjectService } from './services/project/project.class';
import { AWSClient } from './aws';  // Import the AWSClient class

export { NextFunction };

// The types for app.get(name) and app.set(name)
export interface Configuration extends ApplicationConfiguration {
  aws?: any;  // Add the 'aws' property
  awsClient?: AWSClient;  // Add the 'awsClient' property
}

// A mapping of service names to types. Will be extended in service files.
export interface ServiceTypes {}

// The application instance type that will be used everywhere else
export type Application = FeathersApplication<ServiceTypes, Configuration>;

// The context for hook functions - can be typed with a service class
export type HookContext<S = any> = FeathersHookContext<Application, S>;

// Add the user as an optional property to all params
declare module '@feathersjs/feathers' {
  interface Params {
    user?: User;
  }

  interface ServiceOptions {
    docs?: ServiceSwaggerOptions;
  }
}
