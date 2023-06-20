import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { BoardRepository } from './board.repository';

@Injectable()
export class BoardsService {
  constructor(
    @InjectConnection() private readonly knex: Knex,
    private boardRepository: BoardRepository,
  ) {}

  createBoard(createBoardDto: CreateBoardDto, USER): Promise<any> {
    return this.boardRepository.createBoard(createBoardDto, USER);
  }

  getBoardById(ID: number): Promise<any> {
    return this.boardRepository.getBoardById(ID);
  }

  getAllBoards() {
    return this.boardRepository.getAllBoards();
  }

  updateBoardStatus(ID: number, STATUS: BoardStatus) {
    return this.boardRepository.updateBoardStatus(ID, STATUS);
  }

  async deleteBoard(ID: number, USER) {
    if (!ID) {
      throw new NotFoundException(`Board ${ID} does not exist.`);
    }

    const BOARD = await this.knex
      .table('BOARD')
      .where('ID', ID)
      .andWhere('USER', { ID: USER.ID })
      .del();
    return { BOARD };
  }
}
