"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectClient = exports.projectMethods = exports.projectPath = void 0;
exports.projectPath = 'project';
exports.projectMethods = ['find', 'get', 'create', 'patch', 'remove'];
const projectClient = (client) => {
    const connection = client.get('connection');
    client.use(exports.projectPath, connection.service(exports.projectPath), {
        methods: exports.projectMethods
    });
};
exports.projectClient = projectClient;
//# sourceMappingURL=project.shared.js.map