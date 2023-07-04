// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import type { HookContext } from '../declarations'

export const checkCompanyExists = async (context: HookContext) => {
  const { data, app } = context;
  const companyService = app.service('companies');
  const company = await companyService.get(data.companyUuid);
  if (!company) {
    throw new Error('Company does not exist');
  }
  return context;
}
