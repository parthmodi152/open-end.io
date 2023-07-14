// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import type { HookContext } from '../declarations';

export const checkCompanyExists = async (context: HookContext) => {
  const { companyUuid } = context.data;
  const knex = context.app.get('postgresqlClient');
  if (companyUuid) {
    const company = await knex.select('uuid').from('companies').where('uuid', companyUuid);
    console.log('>>> company exists? ', company);
    if (!company.length) {
      throw new Error('Company does not exist');
    }
  }

  return context;
};
