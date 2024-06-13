import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import User from "../../infra/user/user.entity";
import { Base } from "../base/base.entity";

type LoginProps = {
  token: string;
  user_id: string;
  localhost: string;
};

@Entity()
@Index("idx_user_id_in_login", ["user"])
export class Login extends Base {
  @Column({ type: "varchar"})
  token: string;

  @Column({ type: "varchar" })
  user_id: string;
  
  @ManyToOne(() => User, user => user.logins)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ type: "varchar", length: 300 })
  localhost: string;

  constructor(props: LoginProps) {
    super();
    Object.assign(this, props);
  }
}