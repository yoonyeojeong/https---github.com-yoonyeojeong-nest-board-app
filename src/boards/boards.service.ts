import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository) private boardRepository: BoardRepository,
  ) {}

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { TITLE, DESCRIPTION } = createBoardDto;
    const board = this.boardRepository.create({
      TITLE,
      DESCRIPTION,
      STATUS: BoardStatus.PUBLIC,
    });
    await this.boardRepository.save(board);
    return board;
  }

  async getBoardById(ID: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: { ID } });

    if (!found) {
      throw new NotFoundException('해당 게시물이 존재하지 않습니다');
    }

    return found;
  }

  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  async updateBoardStatus(ID: number, STATUS: BoardStatus): Promise<Board> {
    const BOARD = await this.getBoardById(ID);
    BOARD.STATUS = STATUS;
    await this.boardRepository.save(BOARD);

    return BOARD;
  }

  async deleteBoard(ID: number): Promise<void> {
    const result = await this.boardRepository.delete(ID);
    if (result.affected === 0) {
      throw new NotFoundException('존재하지 않는 게시글입니다.');
    }
    console.log('result : ', result);
  }
}
