import { Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginUsecase } from '../../usecases/login/login.usecase';
import User from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { LoginRepository } from '../login/login.repository';
import { Login } from '../login/login.entity';
import { AppCacheModule } from '../cache/cache.module';
import { UsersModule } from '../user/users.module';
import { CacheService } from '../cache/cache.service';
import { LocalStrategy } from './localStorage';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({
      session: true,
    }),
    AppCacheModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.SALT,
      signOptions: { expiresIn: '1d'},
    }),
    TypeOrmModule.forFeature([Login, User])
  ],
  controllers: [AuthController],
  providers: [
    LoginUsecase,
    LoginRepository,
    UserRepository,
    AuthGuard,
    CacheService,
    LocalStrategy
  ],
})
export class AuthModule {}