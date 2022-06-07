import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { Business } from "./Business";
import { Collaborators } from "./Collaborators";
import { Transactions } from "./Transactions";

@Entity()
export class Payments {
  @PrimaryGeneratedColumn("uuid")
  paymentId?: string;

  @CreateDateColumn()
  dateEmission?: Date;

  @Column()
  liquidValue: number;

  @Column()
  brut_value: number;

  @OneToOne(() => Transactions, (transaction) => transaction.payment, {
    lazy: true,
  })
  transaction: Transactions;

  @ManyToOne(() => Business, (busine) => busine.payments)
  busine: Business;

  @ManyToOne(() => Collaborators, (collaborator) => collaborator.payments)
  collaborator: Collaborators;
}
