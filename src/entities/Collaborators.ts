import { compare } from "bcryptjs";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { Business } from "./Business";

import { Payments } from "./Payments";
import { Transactions } from "./Transactions";
import { bankData } from "./bankData";

@Entity()
export class Collaborators {
  @PrimaryGeneratedColumn("uuid")
  collaboratorId?: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  contact: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ default: false })
  isPaymaster?: boolean;

  @OneToOne(() => bankData, (bankdata) => bankdata.collaborator, {
    eager: true,
  })
  bankData: bankData;

  @ManyToOne(() => Business, (busine) => busine.collaborators)
  busine: Business;

  @OneToMany(() => Payments, (payment) => payment.collaborator)
  payments: Payments[];

  @OneToMany(() => Transactions, (transaction) => transaction.collaborator)
  transactions: Transactions[];

  comparePwd = async (pass: string): Promise<boolean> => {
    return await compare(pass, this.password);
  };
}
