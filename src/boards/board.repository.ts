import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';

@Injectable()
export class BoardRepository {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async createBoard(createBoardDto: CreateBoardDto, USER): Promise<any> {
    try {
      const BOARD = await this.knex.table('BOARD').insert({
        TITLE: createBoardDto.TITLE,
        DESCRIPTION: createBoardDto.DESCRIPTION,
        STATUS: BoardStatus.PUBLIC,
        USERID: USER.ID,
      });
      return { BOARD };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getBoardById(ID: number): Promise<any> {
    if (!ID) {
      throw new NotFoundException(`Board ${ID} does not exist`);
    }

    const BOARDS = await this.knex.table('BOARD').where('ID', ID);
    return { BOARDS };
  }

  async getAllBoards() {
    const BOARDS = await this.knex.table('BOARD');
    return { BOARDS };
  }

  async updateBoardStatus(ID: number, STATUS: BoardStatus) {
    try {
      const BOARD = await this.knex.table('BOARD').where('ID', ID).update({
        STATUS,
      });
      return { BOARD };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
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
