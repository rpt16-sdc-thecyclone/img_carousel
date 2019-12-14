var faker = require('faker');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      return knex.raw(`ALTER SEQUENCE products_id_seq RESTART WITH 1`);
    })
    .then(function () {
      //Insert previously generated data from product.csv file
      return knex.raw(`COPY products(name) FROM '/Users/troymclaughlin/Desktop/img_carousel/product.csv' DELIMITER ',' CSV HEADER`);
    });
};
