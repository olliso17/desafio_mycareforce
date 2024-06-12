import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import User from "./user.entity";

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private typeOrm: Repository<User>
  ) {}

  async create(user: User): Promise<User> {
    const new_user = await this.typeOrm.save(user);
    return new_user;
  }
  async find(id: string): Promise<User> {
    const user = await this.typeOrm.findOneOrFail({
      where: { id: id },
      relations: ["ongs"], 
    });
    return user;
  }
  async active(user: User): Promise<User> {
    const new_user = await this.typeOrm.save(user);
    return new_user;
  }
  async findAll(): Promise<User[]> {
    const users = await this.typeOrm.find();
    return users;
  }
  async update(user: User): Promise<User> {
    const new_user = await this.typeOrm.save(user);
    return new_user;
  }
}
