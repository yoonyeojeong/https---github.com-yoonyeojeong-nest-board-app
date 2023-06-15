import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/:id')
  getBoardById(@Param('id') ID: number): Promise<Board> {
    return this.boardsService.getBoardById(ID);
  }

  @Get()
  getAllBoard(@GetUser() USER: User): Promise<Board[]> {
    return this.boardsService.getAllBoards(USER);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() USER: User,
  ): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto, USER);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) ID: number,
    @Body('status', BoardStatusValidationPipe) STATUS: BoardStatus,
  ) {
    return this.boardsService.updateBoardStatus(ID, STATUS);
  }

  @Delete('/:id')
  deleteBoard(
    @Param('id', ParseIntPipe) ID,
    @GetUser() USER: User,
  ): Promise<void> {
    return this.boardsService.deleteBoard(ID, USER);
  }
}
