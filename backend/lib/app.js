"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html
const feathers_1 = require("@feathersjs/feathers");
const aws_1 = __importDefault(require("./aws"));
const configuration_1 = __importDefault(require("@feathersjs/configuration"));
const koa_1 = require("@feathersjs/koa");
const socketio_1 = __importDefault(require("@feathersjs/socketio"));
const configuration_2 = require("./configuration");
const log_error_1 = require("./hooks/log-error");
const postgresql_1 = require("./postgresql");
const index_1 = require("./services/index");
const channels_1 = require("./channels");
const middleware_1 = require("./middleware");
const authentication_1 = require("./authentication");
// @eslint-ignore
// @ts-ignore
const swagger = require('feathers-swagger');
const app = (0, koa_1.koa)((0, feathers_1.feathers)());
exports.app = app;
// Load our app configuration (see config/ folder)
app.configure((0, configuration_1.default)(configuration_2.configurationValidator));
app.configure(swagger({
    specs: {
        info: {
            title: 'A test',
            description: 'A description',
            version: '1.0.0',
        },
    },
    components: {
        securitySchemes: {
            BearerAuth: {
                type: 'http',
                scheme: 'bearer',
            },
        },
    },
    security: [{ BearerAuth: [] }],
    ui: swagger.swaggerUI(),
}));
// Set up Koa middleware
app.use((0, koa_1.cors)({
    //origin: (app.get('origins') as string[]).join(','),
    origin: '*',
}));
app.use((0, koa_1.serveStatic)(app.get('public')));
app.use((0, koa_1.errorHandler)());
app.use((0, koa_1.parseAuthentication)());
app.use((0, koa_1.bodyParser)());
// Configure services and transports
app.configure((0, koa_1.rest)());
app.configure((0, socketio_1.default)({
    allowRequest: (req, callback) => {
        console.log('allowRequest', req.headers.origin);
        callback(null, req.headers.origin !== undefined && app.get('origins').includes(req.headers.origin));
    },
    path: '/socket.io/',
    cors: {
        //origin: (app.get('origins') as string[]).join(','),
        //origin: '*',
        methods: ['GET', 'POST']
    }
}));
app.configure(channels_1.channels);
app.configure(postgresql_1.postgresql);
app.configure(authentication_1.authentication);
app.configure(aws_1.default);
app.configure(index_1.services);
// Register hooks that run on all service methods
app.hooks({
    around: {
        all: [log_error_1.logError],
    },
    before: {},
    after: {},
    error: {},
});
app.hooks({
    setup: [],
    teardown: [],
});
app.use((0, middleware_1.health)());
//# sourceMappingURL=app.js.map