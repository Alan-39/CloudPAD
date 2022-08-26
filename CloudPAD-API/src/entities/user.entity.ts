import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  displayName: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  hasAccess: Array<string> = [];
}
