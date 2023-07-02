import { HookContext, NextFunction } from '../declarations';
import { Forbidden } from '@feathersjs/errors';

export const emailUnique = async (context: HookContext) => {
  const { email } = context.data;
  const knex = context.app.get('postgresqlClient');
  if (email) {
    const user = await knex.select('uuid').from('users').where('email', email);
    console.log('>>> user exists? ', user);
    if (user.length > 0) {
      throw new Forbidden('User already exists');
    }
  }
};
