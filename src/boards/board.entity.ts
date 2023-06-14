import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BoardStatus } from './board-status.enum';

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
}
