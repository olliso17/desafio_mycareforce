import { Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './infra/auth/auth.module';
import { UsersModule } from './infra/user/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/data-source';
import { RedisConfigService } from './redis.config';
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    AuthModule,
    CacheModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
