exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE products(
    id SERIAL PRIMARY KEY NOT NULL,
    name TEXT
    )`
    return knex.raw(createQuery)
};

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE products`
  return knex.raw(dropQuery)
};

// exports.up = function(knex, Promise) {
//   return knex.schema.createTable('products', table => {
//     table.increments('id')
//     table.string('name')
//   });
// };

// exports.down = function(knex, Promise) {
//   return knex.schema.dropTable('products')
// };
