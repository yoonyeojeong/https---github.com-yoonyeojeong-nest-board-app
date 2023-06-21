import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KnexModule } from 'nest-knexjs';

@Module({
  imports: [
    ConfigModule.forRoot(), // 기본적인 ConfigModule.forRoot 사용
    BoardsModule,
    AuthModule,
    KnexModule.forRootAsync({
      imports: [ConfigModule], // ConfigModule을 가져와 사용하기 위해 import
      useFactory: (configService: ConfigService) => ({
        config: {
          client: 'mysql',
          connection: {
            host: configService.get('DB_HOST'),
            user: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_DATABASE'),
          },
        },
      }),
      inject: [ConfigService], // ConfigService 주입
    }),
  ],
  providers: [],
})
export class AppModule {}
