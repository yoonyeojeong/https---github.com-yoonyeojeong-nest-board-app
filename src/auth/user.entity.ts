import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'USER' })
@Unique(['USERNAME'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  USERNAME: string;

  @Column()
  PASSWORD: string;
}
