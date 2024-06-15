import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "./users.controller";
import { UserRepository } from "./user.repository";
import { LoginUsecase } from "../../usecases/login/login.usecase";
import { AuthGuard } from "../auth/auth.guard";
import User from "./user.entity";
import {CreateUseUsecase} from "../../usecases/user/createUser.usecase";
import { Login } from "../login/login.entity";
import { LoginRepository } from "../login/login.repository";
import { JwtService } from "@nestjs/jwt";
import { CacheService } from "../../cache/cache.service";
import { AppCacheModule } from "../../cache/cache.module";
import { FindUserByIdUsecase } from "../../usecases/user/find.by.user.id";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Login])
  ],
  controllers: [UsersController],
  providers: [
    CreateUseUsecase,
    UserRepository,
    LoginRepository,
    FindUserByIdUsecase,
    LoginUsecase,
    AuthGuard,
    CacheService
  ],
  exports: [UserRepository]
})
export class UsersModule {}