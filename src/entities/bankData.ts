import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToOne,
  ManyToMany,
  JoinColumn,
} from "typeorm";
import { Collaborators } from "./Collaborators";

@Entity()
export class bankData {
  @PrimaryGeneratedColumn("uuid")
  bankDataId?: string;

  @Column()
  pix: string;

  @Column()
  agencia: string;

  @Column()
  conta: string;

  @Column()
  banco: string;

  @OneToOne(() => Collaborators, (collaborator) => collaborator.bankData, {
    nullable: true,
  })
  @JoinColumn()
  collaborator: Collaborators;
}
