// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema';
import type { Static } from '@feathersjs/typebox';
import { getValidator, querySyntax, Type } from '@feathersjs/typebox';

import type { HookContext } from '../../declarations';
import { dataValidator, queryValidator } from '../../validators';

// Main data model schema
export const companiesSchema = Type.Object(
  {
    uuid: Type.String(),
    name: Type.String(),
    credits: Type.Number(),
  },
  { $id: 'Companies', additionalProperties: false }
);
export type Companies = Static<typeof companiesSchema>;
export const companiesValidator = getValidator(companiesSchema, dataValidator);
export const companiesResolver = resolve<Companies, HookContext>({});

export const companiesExternalResolver = resolve<Companies, HookContext>({});

// Schema for creating new entries
export const companiesDataSchema = Type.Pick(
  companiesSchema,
  ['name', 'credits'],
  {
    $id: 'CompaniesData',
  }
);
export type CompaniesData = Static<typeof companiesDataSchema>;
export const companiesDataValidator = getValidator(
  companiesDataSchema,
  dataValidator
);
export const companiesDataResolver = resolve<Companies, HookContext>({});

// Schema for updating existing entries
export const companiesPatchSchema = Type.Partial(
  Type.Pick(companiesSchema, ['name', 'credits']),
  {
    $id: 'CompaniesPatch',
  }
);
export type CompaniesPatch = Static<typeof companiesPatchSchema>;
export const companiesPatchValidator = getValidator(
  companiesPatchSchema,
  dataValidator
);
export const companiesPatchResolver = resolve<Companies, HookContext>({});

// Schema for allowed query properties
export const companiesQueryProperties = Type.Pick(companiesSchema, [
  'uuid',
  'name',
]);
export const companiesQuerySchema = Type.Intersect(
  [
    querySyntax(companiesQueryProperties),
    // Add additional query properties here
    Type.Object(
      {
        creditsMoreThan: Type.Optional(Type.Number({ minimum: 0 })),
      },
      { additionalProperties: false }
    ),
  ],
  { additionalProperties: false }
);
export type CompaniesQuery = Static<typeof companiesQuerySchema>;
export const companiesQueryValidator = getValidator(
  companiesQuerySchema,
  queryValidator
);
export const companiesQueryResolver = resolve<CompaniesQuery, HookContext>({});
