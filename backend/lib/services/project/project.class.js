"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptions = exports.ProjectService = void 0;
const knex_1 = require("@feathersjs/knex");
// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
class ProjectService extends knex_1.KnexService {
}
exports.ProjectService = ProjectService;
const getOptions = (app) => {
    return {
        id: 'uuid',
        paginate: app.get('paginate'),
        Model: app.get('postgresqlClient'),
        name: 'project'
    };
};
exports.getOptions = getOptions;
//# sourceMappingURL=project.class.js.map