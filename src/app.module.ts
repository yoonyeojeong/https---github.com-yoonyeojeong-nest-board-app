import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { BoardsModule } from './boards/boards.module';
import { BoardRepository } from './boards/board.repository';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), BoardsModule],
  providers: [BoardRepository],
})
export class AppModule {}
