// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema';
import { Type, getValidator, querySyntax } from '@feathersjs/typebox';
import type { Static } from '@feathersjs/typebox';

import type { HookContext } from '../../declarations';
import { dataValidator, queryValidator } from '../../validators';

// Main data model schema
export const projectSchema = Type.Object(
  {
    uuid: Type.String(),
    name: Type.String(),
    description: Type.Optional(Type.String()),
    config: Type.Optional(Type.Object({}, { additionalProperties: true })),
    companyUuid: Type.String({ format: 'uuid' }),
    createdBy: Type.String({ format: 'uuid' }),
    dataFileUrl: Type.Optional(Type.String()),
    resultFileUrl: Type.Optional(Type.String()),
    createdAt: Type.String({ format: 'date-time' }),
    updatedAt: Type.String({ format: 'date-time' }),
  },
  { $id: 'Project', additionalProperties: false }
);
export type Project = Static<typeof projectSchema>;
export const projectValidator = getValidator(projectSchema, dataValidator);
export const projectResolver = resolve<Project, HookContext>({});

export const projectExternalResolver = resolve<Project, HookContext>({});

// Schema for creating new entries
export const projectDataSchema = Type.Pick(
  projectSchema,
  ['name', 'description', 'config', 'companyUuid', 'createdBy', 'dataFileUrl'],
  {
    $id: 'ProjectData',
  }
);
export type ProjectData = Static<typeof projectDataSchema>;
export const projectDataValidator = getValidator(
  projectDataSchema,
  dataValidator
);
export const projectDataResolver = resolve<Project, HookContext>({});

// Schema for updating existing entries
export const projectPatchSchema = Type.Partial(projectSchema, {
  $id: 'ProjectPatch',
});
export type ProjectPatch = Static<typeof projectPatchSchema>;
export const projectPatchValidator = getValidator(
  projectPatchSchema,
  dataValidator
);
export const projectPatchResolver = resolve<Project, HookContext>({});

// Schema for allowed query properties
export const projectQueryProperties = Type.Pick(projectSchema, [
  'uuid',
  'name',
  'companyUuid',
  'createdBy',
]);
export const projectQuerySchema = Type.Intersect(
  [
    querySyntax(projectQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false }),
  ],
  { additionalProperties: false }
);
export type ProjectQuery = Static<typeof projectQuerySchema>;
export const projectQueryValidator = getValidator(
  projectQuerySchema,
  queryValidator
);
export const projectQueryResolver = resolve<ProjectQuery, HookContext>({});
