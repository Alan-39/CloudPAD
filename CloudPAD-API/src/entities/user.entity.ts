import { Entity, Unique, ObjectIdColumn, Column } from 'typeorm';

@Entity()
@Unique(['displayName', 'username'])
export class User {
  @ObjectIdColumn()
  id: string;

  @Column()
  displayName: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  hasAccess: string[];
}
