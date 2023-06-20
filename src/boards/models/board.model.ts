import { Knex } from 'knex';

interface Board {
  ID: number;
  TITLE: string;
  DESCRIPTION: string;
  USERID: number;
}

const createTable = (knex: Knex) => {
  knex.schema.createTable('BOARD', (table) => {
    table.increments('ID').primary();
    table.string('TITLE').notNullable();
    table.string('DESCRIPTION').notNullable();
    table.integer('USERID').notNullable();
  });
};

export { Board, createTable };
