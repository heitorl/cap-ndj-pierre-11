import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Business } from "./Business";
import { Collaborators } from "./Collaborators";
import { Payments } from "./Payments";

@Entity()
export class Transactions {
  @PrimaryGeneratedColumn("uuid")
  transactionId?: string;

  @CreateDateColumn()
  dateEmission?: Date;

  @Column({ nullable: true })
  dateDeadline?: string;

  @Column()
  value: number;

  @Column()
  description: string;

  @Column()
  type: string;

  @OneToOne(() => Payments, (payment) => payment.transaction, { lazy: true })
  @JoinColumn()
  payment: Payments;

  @ManyToOne(() => Business, (busine) => busine.transactions)
  busine: Business;

  @ManyToOne(() => Collaborators, (collaborator) => collaborator.transactions)
  collaborator: Collaborators;
}
