import { Injectable } from "@nestjs/common";
import User from "../../infra/user/user.entity";
import { EditPasswordUserInputDto } from "../../infra/user/dto/edit-user.dto";
import { UserRepository } from "../../infra/user/user.repository";

const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();
@Injectable()
export default class EditPasswordUserUsecase{
    constructor(
        // @Inject("UserRepo")
        private usersRepository: UserRepository,
    
      ) {}
      async execute(input:EditPasswordUserInputDto):Promise<{message:string}> {
        const salt = process.env.SALT;
        let isUser:User;
        input.email = bcrypt.hashSync(input.email, salt);
        input.password = bcrypt.hashSync(input.password, salt);
        const users = await this.usersRepository.findAll();
        users.map(async user =>{
          if(user.email === input.email && user.password === input.password){
            isUser = user;
          }
        })
        try{
          isUser.password = bcrypt.hashSync(input.new_password, salt);
          isUser.updated_at = new Date()
          if(isUser.active === false) {
            isUser.active = true;
          }
          await this.usersRepository.update(isUser)
          return{message: "updated successfully"}
          
        }catch(err){
          return { message:"credentials invalid"};
        };
        
      }
}