import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/:id')
  getBoardById(@Param('id') ID: number): Promise<Board> {
    return this.boardsService.getBoardById(ID);
  }

  @Get()
  getAllBoard(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) ID: number,
    @Body('status', BoardStatusValidationPipe) STATUS: BoardStatus,
  ) {
    return this.boardsService.updateBoardStatus(ID, STATUS);
  }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) ID): Promise<void> {
    return this.boardsService.deleteBoard(ID);
  }
}
