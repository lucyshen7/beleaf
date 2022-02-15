/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('species', (table) => {
    table.increments('id').primary();
    table.string('scientific_name');
    table.string('common_name');
    table.string('category');
    table.text('description');
    table.string('photo');
    table.string('light_level');
    table.string('soil_type');
    table.boolean('toxic')
    table.string('difficulty_level');
    table.integer('watering_interval');
    table.timestamps;
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('species', true);
};
