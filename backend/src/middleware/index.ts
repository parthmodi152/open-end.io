import { FeathersKoaContext } from '@feathersjs/koa/src/declarations';

export function health() {
  return async (ctx: FeathersKoaContext, next: () => Promise<void>) => {
    const { app, request, response } = ctx;
    if (request.method === 'GET' && ctx.request.url === '/version') {
      ctx.status = 200;
      response.body = JSON.stringify({ success: true, feathersVersion: app.version });
      ctx.set('Content-Type', 'application/json; charset=utf-8');
    }
    await next();
  };
}
