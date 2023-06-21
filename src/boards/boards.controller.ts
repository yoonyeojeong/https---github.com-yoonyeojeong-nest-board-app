import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
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
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  private logger = new Logger('Boards');
  constructor(private boardsService: BoardsService) {}
  @Get()
  async getAllBoards() {
    return await this.boardsService.getAllBoards();
  }

  @Get('/:id')
  getBoardById(@Param('id') ID: number) {
    return this.boardsService.getBoardById(ID);
  }

  @Get()
  getAllBoard(@GetUser() USER) {
    this.logger.verbose(`User ${USER.USERNAME} trying to get all boards`);
    return this.boardsService.getAllBoards();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto, @GetUser() USER) {
    this.logger.verbose(
      `User ${
        USER.USERNAME
      } creating a new board content. Payload : ${JSON.stringify(
        createBoardDto,
      )}`,
    );
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
  deleteBoard(@Param('id', ParseIntPipe) ID, @GetUser() USER) {
    return this.boardsService.deleteBoard(ID, USER);
  }
}
