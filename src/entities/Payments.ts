import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToOne,
  ManyToMany
} from "typeorm";
import { Collaborators } from "./Collaborators";
import { Discounts } from "./Discounts";
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

  @ManyToMany(() => Discounts, (discount) => discount.payments)
  discount: Discounts[];

  @OneToOne(() => Transactions, (transaction) => transaction.payment)
  transaction: Transactions;

  @ManyToOne(() => Collaborators, (collaborator) => collaborator.payments)
  collaborator: Collaborators;
}
