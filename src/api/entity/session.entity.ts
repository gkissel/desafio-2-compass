import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { Movie } from './movie.entity';
import { Ticket } from './ticket.entity';

@Entity({ name: 'Sessions' })
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  room: string;

  @Column('integer')
  capacity: number;

  @Column('varchar')
  day: string;

  @Column('varchar')
  time: string;

  @ManyToOne(() => Movie, (movie) => movie.sessions)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

  @Column('integer')
  movie_id: number

  @OneToMany(() => Ticket, (ticket) => ticket.session)
  tickets: Ticket[];

  @CreateDateColumn()
  created_at: Timestamp;

  @UpdateDateColumn()
  updated_at: Timestamp;

  @DeleteDateColumn()
  deleted_at: Timestamp;
}
