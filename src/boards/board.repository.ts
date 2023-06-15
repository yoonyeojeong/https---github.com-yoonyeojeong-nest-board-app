import { DataSource, Repository } from 'typeorm';
import { Board } from './board.entity';
import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }
  async createBoard(
    createBoardDto: CreateBoardDto,
    USER: User,
  ): Promise<Board> {
    const { TITLE, DESCRIPTION } = createBoardDto;

    const board = this.create({
      TITLE,
      DESCRIPTION,
      STATUS: BoardStatus.PUBLIC,
      USER,
    });

    await this.save(board);
    return board;
  }
}
