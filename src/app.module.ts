import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { typeORMConfig } from './configs/typeorm.config';
import { BoardsModule } from './boards/boards.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CONFIG_VALIDATOR } from 'config/config.validator';
import { MysqlConfigProvider } from './configs/typeorm.config';
import { KnexModule } from 'nest-knexjs';

@Module({
  imports: [
    ConfigModule.forRoot(CONFIG_VALIDATOR),
    BoardsModule,
    AuthModule,
    KnexModule.forRoot({
      config: {
        client: 'mysql',
        connection: {
          host: 'newsninetest.cxuwgutramf1.ap-northeast-2.rds.amazonaws.com',
          user: 'newsnine',
          password: 'newsnine',
          database: 'TEST',
        },
      },
    }),
  ],
  providers: [],
})
export class AppModule {}

// @Module({
//   imports: [
//     ConfigModule.forRoot(CONFIG_VALIDATOR),
//     TypeOrmModule.forRootAsync({
//       useClass: MysqlConfigProvider,
//     }),
//     BoardsModule,
//     AuthModule,
//   ],
//   providers: [BoardRepository],
// })
// export class AppModule {}
