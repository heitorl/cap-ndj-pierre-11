import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
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
}
