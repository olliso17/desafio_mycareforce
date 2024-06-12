
    import { Global, Module } from "@nestjs/common";
    import {CacheModule} from "@nestjs/cache-manager";
    import { RedisClientOptions } from "redis";
    import {redisStore} from "cache-manager-redis-yet";
    import { CacheService } from './cache.service';
    import { CacheController } from './cache.controller';

    @Global()
    @Module({
        imports:[
            CacheModule.register<RedisClientOptions>({
                store: redisStore,
                socket: {
                    host: process.env.REDIS_HOST || 'localhost',
                    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
                },
            }),
            ],
        controllers:[CacheController],
        providers: [CacheService],
        exports:[CacheService,  CacheModule]
    })

    export class AppCacheModule{}