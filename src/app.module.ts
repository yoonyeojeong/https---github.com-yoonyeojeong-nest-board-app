import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { typeORMConfig } from './configs/typeorm.config';
import { BoardsModule } from './boards/boards.module';
import { BoardRepository } from './boards/board.repository';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CONFIG_VALIDATOR } from 'config/config.validator';
import { MysqlConfigProvider } from './configs/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot(CONFIG_VALIDATOR),
    TypeOrmModule.forRootAsync({
      useClass: MysqlConfigProvider,
    }),
    BoardsModule,
    AuthModule,
  ],
  providers: [BoardRepository],
})
export class AppModule {}

// type: 'mysql',
//       host: process.env.HOST,
//       port: +process.env.DBPORT,
//       username: process.env.USER,
//       password: process.env.PASS,
//       database: process.env.DB,
//       entities: [__dirname + '/../**/*.entity.{js,ts}'],
//       synchronize: true,
