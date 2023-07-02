import { FeathersKoaContext } from '@feathersjs/koa/src/declarations';
export declare function health(): (ctx: FeathersKoaContext, next: () => Promise<void>) => Promise<void>;
