/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('contacts', function (table) {
    table.increments('id');
    table.string('name', 255).notNullable();
    table.string('email', 255).notNullable();
    table.string('phone', 255).notNullable();
    table.string('avatar', 255).notNullable();
    table.timestamp('birthday', 255).notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('contacts');
};
