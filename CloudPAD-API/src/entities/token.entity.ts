import { Entity, Unique, ObjectIdColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
@Unique(['token'])
export class Token {
  @ObjectIdColumn()
  id: string;

  @Column()
  token: string;

  @CreateDateColumn()
  createdAt: Date;
}
