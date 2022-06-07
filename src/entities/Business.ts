import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { compare } from "bcrypt";
import { Collaborators } from "./Collaborators";
import { Payments } from "./Payments";
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

  @Column()
  cnpj: string;

  @Column({ default: false })
  isAdmin?: boolean;

  @OneToMany(() => Collaborators, (collaborator) => collaborator.busine)
  collaborators: Collaborators[];

  @OneToMany(() => Payments, (payment) => payment.busine)
  payments: Payments[];

  @OneToMany(() => Transactions, (transaction) => transaction.busine)
  transactions: Transactions[];

  comparePwd = async (pass: string): Promise<boolean> => {
    return await compare(pass, this.password);
  };
}
