import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../infra/user/user.repository";
import User from "../../infra/user/user.entity";

@Injectable()
export class FindUserByIdUsecase{
    constructor(
       
        private usersRepository: UserRepository,
    
      ) {}
      async execute(id: string):Promise<User | {message:string}> {
        
        try{
          
          const user = await this.usersRepository.find(id);
          
          return user;

        }catch(err){
          return { message:"user not found"};
        };
        
      }
}