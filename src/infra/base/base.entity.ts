import { Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";


export class Base {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "boolean", default: true })
  active: boolean;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
    
  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  deleted_at: Date;

}