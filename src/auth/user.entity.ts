import { Board } from 'src/boards/board.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
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

  @OneToMany((type) => Board, (BOARD) => BOARD.USER, { eager: true })
  BOARDS: Board[];
}
