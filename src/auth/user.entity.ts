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
@Unique(['NICKNAME'])
@Unique(['BOARD_NICKNAME'])
@Unique(['EMAIL'])
@Unique(['CALLNUM'])
@Unique(['GOOGLE'])
@Unique(['APPLE'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  USERNAME: string;

  @Column()
  PASSWORD: string;

  @Column()
  EMAIL: string;

  @Column()
  NICKNAME: string;

  @Column()
  BOARD_NICKNAME: string;

  @Column()
  INTRODUCE: string;

  @Column()
  GENDER: boolean;

  @Column()
  BIRTHDAY: string;

  @Column()
  CALLNUM: string;

  @Column()
  IMAGE: string;

  @Column()
  GOOGLE: string;

  @Column()
  APPLE: string;

  @Column()
  ISLOGIN: boolean;

  @Column()
  STATE: number;

  @Column()
  REGION: string;

  @Column()
  LANGUAGE: string;

  @OneToMany((type) => Board, (BOARD) => BOARD.USER, { eager: true })
  BOARDS: Board[];
}
