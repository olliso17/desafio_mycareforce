import { Injectable } from "@nestjs/common";
import User from "../../infra/user/user.entity";
import { UserRepository } from "../../infra/user/user.repository";
import { LoginRepository } from "../../infra/login/login.repository";
import { CreateUserInputDto, CreateUserOutputDto } from "../../infra/user/dto/create.user.dto";
import { Login } from "../../infra/login/login.entity";
import { JwtService } from "@nestjs/jwt";
import { CacheService } from "../../infra/cache/cache.service";

const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const os = require("os");

dotenv.config();

@Injectable()
export class CreateUseUsecase {
  constructor(
    private usersRepository: UserRepository,
    private loginRepository: LoginRepository,
    private jwtService: JwtService,
    private cacheService: CacheService
  ) { }
  async create(
    createUserDto: CreateUserInputDto,
  ): Promise<CreateUserOutputDto> {
    const networkInfo = os.networkInterfaces();
    const salt = process.env.SALT;

    createUserDto.email = bcrypt.hashSync(createUserDto.email, salt);
    createUserDto.password = bcrypt.hashSync(createUserDto.password, salt);
    const user = new User(createUserDto);
    const payload = {
      userEmail: user.email, userName: user.name
    }
    const token = {
      access_token: await this.jwtService.signAsync(payload)
    }

    try {
      const create_user = await this.usersRepository.create(user);
      const login = new Login({
        user_id: create_user.id,
        token: token.access_token,
        localhost: networkInfo.lo[0].address,
      });
      await this.loginRepository.createLogin(login);
      await this.cacheService.storeData(token.access_token)

      return { message: 'created successfully', token: token.access_token , id:create_user.id};
    } catch (err) {
      return { message: "credentials invalid" + err +' '+ token.access_token};
    }
  }
}