import { Test, TestingModule } from '@nestjs/testing';
import { CacheService } from './cache.service';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-yet';

describe('CacheService', () => {
  let service: CacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[
        CacheModule.register<RedisClientOptions>({
            store: redisStore,
            socket: {
                host: process.env.REDIS_HOST || 'cache',
                port: parseInt(process.env.REDIS_PORT, 10) || 6379,
                
            },
            password: process.env.REDIS_PASSWORD,
            ttl: 86400, 
        }),
        ],
      providers: [CacheService],
      exports:[CacheService,  CacheModule]
    }).compile();

    service = module.get<CacheService>(CacheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
