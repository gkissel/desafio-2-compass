import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  // OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'Movies' })
export class Movie {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  image: string

  @Column('varchar')
  name: string

  @Column('varchar')
  description: string

  @Column('simple-array')
  actors: string[]

  @Column('varchar')
  genre: string

  @Column('datetime')
  release_date: Timestamp

  // @OneToMany(() => Session, (session) => session.movie, { onDelete: 'CASCADE' })
  // sessions: Session[]

  @CreateDateColumn()
  created_at: Timestamp

  @UpdateDateColumn()
  updated_at: Timestamp

  @DeleteDateColumn()
  deleted_at: Timestamp
}
