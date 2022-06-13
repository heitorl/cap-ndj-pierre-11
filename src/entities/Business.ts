import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { compare } from "bcrypt";
import { Collaborators } from "./Collaborators";
import { Transactions } from "./Transactions";

@Entity()
export class Business {
  @PrimaryGeneratedColumn("uuid")
  busineId?: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  cnpj: string;

  @Column({ default: true })
  isAdmin?: boolean;

  @OneToMany(() => Collaborators, (collaborator) => collaborator.busine)
  collaborators: Collaborators[];

  @OneToMany(() => Transactions, (transaction) => transaction.busine)
  transactions: Transactions[];

  comparePwd = async (pass: string): Promise<boolean> => {
    return await compare(pass, this.password);
  };
}
