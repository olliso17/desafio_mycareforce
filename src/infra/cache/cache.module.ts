
    import { Global, Module} from "@nestjs/common";
    import {CacheModule} from "@nestjs/cache-manager";
    import { RedisClientOptions } from "redis";
    import {redisStore} from "cache-manager-redis-yet";
    import { CacheService } from './cache.service';

    @Global()
    @Module({
        
        imports:[
            CacheModule.register<RedisClientOptions>({
                store: redisStore,
                url: process.env.REDIS_URL,
                ttl: 86400, 
            }),
            ],
        providers: [CacheService],
        exports:[CacheService,  CacheModule]
    })

    export class AppCacheModule {}