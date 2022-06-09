import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
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
}
