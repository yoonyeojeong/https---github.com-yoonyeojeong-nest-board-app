const table = 'TEST2';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  knex.schema
    .createTable(table, (t) => {
      t.increments('ID').primary();
      t.string('TESTCOLUMN').notNullable();
      t.integer('TESTNUMBER').notNullable().unique();
    })
    .then(() =>
      knex(table).insert({ ID: 1, TESTCOLUMN: 'TEST', TESTNUMBER: 5 }),
    );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTableIfExists(table);
};
