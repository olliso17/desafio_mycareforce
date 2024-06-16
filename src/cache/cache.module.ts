
    import { Global, Module } from "@nestjs/common";
    import {CacheModule} from "@nestjs/cache-manager";
    import { RedisClientOptions } from "redis";
    import {redisStore} from "cache-manager-redis-yet";
    import { CacheService } from './cache.service';

    @Global()
    @Module({
        imports:[
            CacheModule.register<RedisClientOptions>({
                store: redisStore,
                socket: {
                    host: process.env.REDIS_HOST ,
                    port: parseInt(process.env.REDIS_PORT),
                },
                // username: process.env.REDIS_USER, 
                password: process.env.REDIS_PASSWORD ,
                ttl: 86400, 
            }),
            ],
        providers: [CacheService],
        exports:[CacheService,  CacheModule]
    })

    export class AppCacheModule{}