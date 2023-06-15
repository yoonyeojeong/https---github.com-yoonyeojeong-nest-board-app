import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardStatus } from './board-status.enum';
import { User } from 'src/auth/user.entity';

@Entity({ name: 'BOARD' })
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  TITLE: string;

  @Column()
  DESCRIPTION: string;

  @Column()
  STATUS: BoardStatus;

  @ManyToOne((type) => User, (USER) => USER.BOARDS, { eager: false })
  USER: User;
}
