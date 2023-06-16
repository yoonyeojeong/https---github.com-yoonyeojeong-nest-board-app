import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MysqlConfigProvider implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get('DB_USERNAME'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_DATABASE'),
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: true,
    };
  }
}

// export const typeORMConfig: TypeOrmModuleOptions = {
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: 'postgres',
//   database: 'board-app',
//   entities: [__dirname + '/../**/*.entity.{js,ts}'],
//   synchronize: true,
// };
// const dbtype = ConfigService.DBTYPE;
// const dbhost = process.env.HOST;

// const configService = new ConfigService();
// const dbtype = configService.get('DBTYPE');
// const logger = new Logger();
// logger.log(dbtype);

// export const typeORMConfig: TypeOrmModuleOptions = {
//   type: 'mysql',
//   host: 'newsninetest.cxuwgutramf1.ap-northeast-2.rds.amazonaws.com',
//   port: 3306,
//   username: 'newsnine',
//   password: 'newsnine',
//   database: 'TEST',
//   entities: [__dirname + '/../**/*.entity.{js,ts}'],
//   synchronize: true,
// };
