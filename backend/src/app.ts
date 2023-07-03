// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html
import { feathers } from '@feathersjs/feathers';
import s3Client from './s3';
import configuration from '@feathersjs/configuration';
import {
  bodyParser,
  cors,
  errorHandler,
  koa,
  parseAuthentication,
  rest,
  serveStatic,
} from '@feathersjs/koa';
import socketio from '@feathersjs/socketio';

import { configurationValidator } from './configuration';
import type { Application } from './declarations';
import { logError } from './hooks/log-error';
import { postgresql } from './postgresql';
import { services } from './services/index';
import { channels } from './channels';
import { health } from './middleware';
import { authentication } from './authentication';

// @eslint-ignore
// @ts-ignore
const swagger = require('feathers-swagger');

const app: Application = koa(feathers());

// Load our app configuration (see config/ folder)
app.configure(configuration(configurationValidator));
app.configure(
  swagger({
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
  })
);

// Set up Koa middleware
app.use(cors({
  //origin: (app.get('origins') as string[]).join(','),
  origin: '*',
}));
app.use(serveStatic(app.get('public')));
app.use(errorHandler());
app.use(parseAuthentication());
app.use(bodyParser());

// Configure services and transports
app.configure(rest());
app.configure(
  socketio(
    {
      allowRequest: (req, callback) => {
        console.log('allowRequest', req.headers.origin);
        callback(null, req.headers.origin !== undefined && (app.get('origins') as string[]).includes(req.headers.origin));
      },
      path: '/socket.io/',
      cors: {
        //origin: (app.get('origins') as string[]).join(','),
        //origin: '*',
        methods: ['GET', 'POST']
      }
    },
  )
);
app.configure(channels);
app.configure(postgresql);
app.configure(authentication);
app.configure(s3Client);
app.configure(services);

// Register hooks that run on all service methods
app.hooks({
  around: {
    all: [logError],
  },
  before: {},
  after: {},
  error: {},
});

app.hooks({
  setup: [],
  teardown: [],
});

app.use(health());

export { app };
