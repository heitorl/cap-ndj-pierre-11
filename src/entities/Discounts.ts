import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
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

  @ManyToMany(() => Payments, (payment) => payment.discount)
  payments: Payments[];
}
