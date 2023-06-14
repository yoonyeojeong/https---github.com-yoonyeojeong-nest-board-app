import { TypeOrmModuleOptions } from '@nestjs/typeorm';

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

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'newsninetest.cxuwgutramf1.ap-northeast-2.rds.amazonaws.com',
  port: 3306,
  username: 'newsnine',
  password: 'newsnine',
  database: 'TEST',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
