module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: 'newsninetest.cxuwgutramf1.ap-northeast-2.rds.amazonaws.com',
      user: 'newsnine',
      password: 'newsnine',
      database: 'TEST',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/database/migrations', // 마이그레이션 파일이 위치할 경로를 설정하세요.
    },
    seeds: {
      directory: './src/database/seeds',
    },
  },
  // production, testing 등 다른 환경에 대해서도 설정할 수 있습니다.
};
