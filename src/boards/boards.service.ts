import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository) private boardRepository: BoardRepository,
  ) {}

  async createBoard(
    createBoardDto: CreateBoardDto,
    USER: User,
  ): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, USER);
  }

  async getBoardById(ID: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: { ID } });

    if (!found) {
      throw new NotFoundException('해당 게시물이 존재하지 않습니다');
    }

    return found;
  }

  async getAllBoards(USER: User): Promise<Board[]> {
    const query = this.boardRepository.createQueryBuilder('BOARD');

    query.where('BOARD.uSERID=:USERID', { USERID: USER.ID });

    const BOARDS = await query.getMany();
    return BOARDS;
  }

  async updateBoardStatus(ID: number, STATUS: BoardStatus): Promise<Board> {
    const BOARD = await this.getBoardById(ID);
    BOARD.STATUS = STATUS;
    await this.boardRepository.save(BOARD);

    return BOARD;
  }

  async deleteBoard(ID: number, USER: User): Promise<void> {
    const result = await this.boardRepository.delete({
      ID,
      USER: { ID: USER.ID },
    });
    if (result.affected === 0) {
      throw new NotFoundException('존재하지 않는 게시글입니다.');
    }
  }
}
