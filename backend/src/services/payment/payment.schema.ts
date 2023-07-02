// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema';
import { Type, getValidator, querySyntax } from '@feathersjs/typebox';
import type { Static } from '@feathersjs/typebox';

import type { HookContext } from '../../declarations';
import { dataValidator, queryValidator } from '../../validators';

// Main data model schema
export const paymentSchema = Type.Object(
  {
    uuid: Type.String({ format: 'uuid' }),
    description: Type.String(),
    type: Type.Optional(Type.String()),
    companyUuid: Type.String({format: 'uuid'}),
    userUuid: Type.String({format: 'uuid'}),
    amount: Type.Number(),
    balance: Type.Number(),
  },
  { $id: 'Payment', additionalProperties: false }
);
export type Payment = Static<typeof paymentSchema>
export const paymentValidator = getValidator(paymentSchema, dataValidator);
export const paymentResolver = resolve<Payment, HookContext>({});

export const paymentExternalResolver = resolve<Payment, HookContext>({});

// Schema for creating new entries
export const paymentDataSchema = Type.Pick(paymentSchema, 
  ['description', 'type', 'companyUuid', 'userUuid', 'amount', 'balance'],
  {
    $id: 'PaymentData'
  });
export type PaymentData = Static<typeof paymentDataSchema>
export const paymentDataValidator = getValidator(paymentDataSchema, dataValidator);
export const paymentDataResolver = resolve<Payment, HookContext>({});

// Schema for updating existing entries
export const paymentPatchSchema = Type.Partial(paymentSchema, {
  $id: 'PaymentPatch'
});
export type PaymentPatch = Static<typeof paymentPatchSchema>
export const paymentPatchValidator = getValidator(
  paymentPatchSchema,
  dataValidator
);
export const paymentPatchResolver = resolve<Payment, HookContext>({});

// Schema for allowed query properties
export const paymentQueryProperties = Type.Pick(paymentSchema, [
  'uuid',
  'companyUuid',
  'userUuid'
]);
export const paymentQuerySchema = Type.Intersect(
  [
    querySyntax(paymentQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
);
export type PaymentQuery = Static<typeof paymentQuerySchema>
export const paymentQueryValidator = getValidator(
  paymentQuerySchema,
  queryValidator
);
export const paymentQueryResolver = resolve<PaymentQuery, HookContext>({});
