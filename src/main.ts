import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.SERVER_PORT;
  const configService = new ConfigService();
  const joiPort = configService.get<number>('SERVER_PORT');
  console.log('joi SERVER_PORT : ', joiPort);

  // yaml 파일 읽어오는 문제
  const serverConfig = config.get('server');
  console.log('serverConfig : ', serverConfig);
  console.log('serverConfig port : ', serverConfig.port);

  await app.listen(port);
  Logger.log(`Application running on port ${port}`);
}
bootstrap();
