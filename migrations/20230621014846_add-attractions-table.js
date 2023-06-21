const table = 'TESTTABLE';
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  knex.schema
    .createTable(table, (t) => {
      t.increments('ID').primary();
      t.string('NAME').notNullable();
      t.string('TITLE').notNullable();
    })
    .then(() =>
      knex(table).insert({ ID: 1, NAME: 'LUFFY', TITLE: 'ONEPIECE' }),
    );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTableIfExists(table);
};
