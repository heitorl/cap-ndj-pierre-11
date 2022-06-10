import { compare } from "bcrypt";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Business } from "./Business";

import { Payments } from "./Payments";
import { Transactions } from "./Transactions";

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

  @Column({ default: false })
  isPaymaster?: boolean;

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
