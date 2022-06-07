import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Payments } from "./Payments";

@Entity()
export class Discounts {
  @PrimaryGeneratedColumn("uuid")
  discountId?: string;

  @Column()
  value: number;

  @Column()
  type: string;

  @ManyToMany(() => Payments, { eager: true })
  @JoinTable()
  payments: Payments[];
}
