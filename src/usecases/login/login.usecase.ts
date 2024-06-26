import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "../../infra/user/user.repository";
import { Login } from "../../infra/login/login.entity";
import { LoginInputDto, LoginOutputDto } from "../../infra/login/dto/login.dto";
import { LoginRepository } from "../../infra/login/login.repository";
import { JwtService } from "@nestjs/jwt";
import { CacheService } from "../../infra/cache/cache.service";

const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const os = require("os");
const jwt = require('jsonwebtoken');
dotenv.config();
@Injectable()
export class LoginUsecase {
  constructor(
    private userRepository: UserRepository,
    private loginRepository: LoginRepository,
    private jwtService: JwtService,
    private cacheService: CacheService
    ) {}

  async execute(input: LoginInputDto): Promise<LoginOutputDto> {
    const users = await this.userRepository.findAll();
    const networkInfo = os.networkInterfaces();
    const salt = process.env.SALT;

  
    const hashedEmail = bcrypt.hashSync(input.email, salt);
    const hashedPassword = bcrypt.hashSync(input.password, salt);

    const isUser = users.find(
      (user) => user.email === hashedEmail && user.password === hashedPassword
    );

    if (!isUser) {
      throw new UnauthorizedException("Credentials invalid");
    }

    const payload = {
      userEmail: hashedEmail, userName: isUser.name,
    }
    const token = {
      access_token: await this.jwtService.signAsync(payload)
    }

   
    const login = new Login({
      user_id: isUser.id,
      token: token.access_token,
      localhost: networkInfo.lo[0].address,
    });

   
    try {
      await this.loginRepository.createLogin(login); 
      await this.cacheService.storeData(token.access_token)
      
      return { message: 'login successfully', token: token.access_token , id:isUser.id};
    } catch (err) {
      throw new UnauthorizedException("Failed to generate token");
    }
  }
}