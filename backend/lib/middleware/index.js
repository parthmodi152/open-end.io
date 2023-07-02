"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.health = void 0;
function health() {
    return async (ctx, next) => {
        const { app, request, response } = ctx;
        if (request.method === 'GET' && ctx.request.url === '/version') {
            ctx.status = 200;
            response.body = JSON.stringify({ success: true, feathersVersion: app.version });
            ctx.set('Content-Type', 'application/json; charset=utf-8');
        }
        await next();
    };
}
exports.health = health;
//# sourceMappingURL=index.js.map