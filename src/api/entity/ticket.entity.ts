import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Timestamp,
  JoinColumn,
} from 'typeorm';
import { Session } from './session.entity';

@Entity({ name: 'tickets' })
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  chair: string;

  @Column('double')
  value: number;

  @ManyToOne(() => Session, (session) => session.tickets)
  @JoinColumn({ name: 'session_id' })
  session: Session;

  @Column('integer')
  session_id: number;

  @CreateDateColumn()
  created_at: Timestamp;

  @UpdateDateColumn()
  updated_at: Timestamp;

  @DeleteDateColumn()
  deleted_at: Timestamp;
}
