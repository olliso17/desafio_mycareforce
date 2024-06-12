import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "./users.controller";
import { UserRepository } from "./user.repository";
import { LoginUsecase } from "../../usecases/login/login.usecase";
import { AuthGuard } from "../auth/auth.guard";
import User from "./user.entity";
import CreateUseUsecase from "../../usecases/user/createUser.usecase";
import EditPasswordUserUsecase from "../../usecases/user/edit.user.usecase";
import { Login } from "../login/login.entity";
import { LoginRepository } from "../login/login.repository";

@Module({
  imports: [TypeOrmModule.forFeature([User, Login])],
  controllers: [UsersController],
  providers: [
    CreateUseUsecase,
    UserRepository,
    LoginRepository,
    EditPasswordUserUsecase,
    LoginUsecase,
    AuthGuard

  ],
  exports: [UserRepository]
})
export class UsersModule {}
