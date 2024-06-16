
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
                    host: process.env.REDIS_HOST || 'cache',
                    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
                    
                },
                username: process.env.REDIS_USER || 'ollie', 
                password: process.env.REDIS_PASSWORD || '12345',
                ttl: 86400, 
            }),
            ],
        providers: [CacheService],
        exports:[CacheService,  CacheModule]
    })

    export class AppCacheModule{}