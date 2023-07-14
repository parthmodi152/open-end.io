"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptions = exports.ProjectService = void 0;
const BaseService_1 = require("../BaseService");
// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
class ProjectService extends BaseService_1.BaseService {
    constructor(options) {
        super(options, options.app);
    }
    async create(data, params) {
        if (Array.isArray(data)) {
            for (let item of data) {
                let key = await this.processFileUpload(item, params);
                item.dataFileUrl = key;
            }
        }
        else {
            let key = await this.processFileUpload(data, params);
            data.dataFileUrl = key;
        }
        return super.create(data, params);
    }
    async processFileUpload(data, params) {
        const { file } = params;
        if (file) {
            const key = `${data.companyUuid}/${file.originalname}`;
            await this.aws.store(key, file.buffer, file.mimetype);
            return key;
        }
    }
}
exports.ProjectService = ProjectService;
const getOptions = (app) => {
    return {
        id: 'uuid',
        paginate: app.get('paginate'),
        Model: app.get('postgresqlClient'),
        name: 'project',
        app: app
    };
};
exports.getOptions = getOptions;
//# sourceMappingURL=project.class.js.map