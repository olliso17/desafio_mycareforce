import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Cache } from 'cache-manager';

const RedisStore = connectRedis(session);

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  constructor(private readonly cacheManager: Cache) {}

  use(req: Request, res: Response, next: NextFunction) {
    const store = new RedisStore({
      client: this.cacheManager.store.getClient(),
    });

    session({
      store: store,
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 86400000 }, // 1 day in milliseconds
    })(req, res, next);
  }
}
