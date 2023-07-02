"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
// For more information about this file see https://dove.feathersjs.com/guides/cli/authentication.html
const authentication_1 = require("@feathersjs/authentication");
const authentication_local_1 = require("@feathersjs/authentication-local");
// TODO: If we ever use keycloak, we need to implement this strategy
// export class KeycloakStrategy extends LocalStrategy {
//
// }
const authentication = (app) => {
    const authentication = new authentication_1.AuthenticationService(app);
    authentication.register('jwt', new authentication_1.JWTStrategy());
    authentication.register('local', new authentication_local_1.LocalStrategy());
    //TODO: If we ever use keycloak, we need to implement this strategy
    //authentication.register('keycloak', new KeycloakStrategy())
    app.use('authentication', authentication);
};
exports.authentication = authentication;
//# sourceMappingURL=authentication.js.map