import { Column, Entity, OneToMany } from "typeorm";
import { Base } from "../base/base.entity";
import { Login } from "../login/login.entity";

type UserProps = {
    name: string;
    email: string;
    password: string;
    logins?: Login[] | [];
  };
  @Entity({ name: "user" })
  export default class User extends Base {
    @Column({ type: "varchar" })
    name: string;
  
    @Column({ type: "varchar",  unique: true })
    email: string;
  
    @Column({ type: "varchar"})
    password: string;

    @OneToMany(() => Login, login => login.user)
    logins: Login[];

    constructor(props: UserProps) {
      super();
  
      Object.assign(this, props);
    }
   
  }