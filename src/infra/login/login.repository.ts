  import { Injectable } from "@nestjs/common";
  import { InjectRepository } from "@nestjs/typeorm";
  import { Repository } from "typeorm";
  import { Login } from "../../infra/login/login.entity";

  @Injectable()
  export class LoginRepository {
    constructor(

      @InjectRepository(Login)
      private typeOrmLogin: Repository<Login>,
    ) { }

    async createLogin(login: Login): Promise<Login> {
      const new_login = await this.typeOrmLogin.save(login);
      return new_login;
    }


  }
