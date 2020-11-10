// const fs = require('fs');
// const knex = require('knex')(config);
// const copyFrom = require('pg-copy-streams');


exports.seed = async (knex) => {

  var startTime = new Date();
  var start = `started writing products at ${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}.${startTime.getMilliseconds()} seconds`

  await knex('products').del();

  await knex.raw(`ALTER SEQUENCE products_id_seq RESTART WITH 1`);
  await knex.raw(`ALTER TABLE products DISABLE TRIGGER ALL`);

  await knex.raw(`Copy products(id,name) FROM '/Users/troymclaughlin/Documents/projects/sdc/img-carousel-microservice/product.csv' DELIMITER ',' CSV HEADER`);

  await knex.raw(`ALTER TABLE products ENABLE TRIGGER ALL`);

  let endTime = new Date()
  var end = `started at ${endTime.getHours()}:${endTime.getMinutes()}:${endTime.getSeconds()}.${endTime.getMilliseconds()} seconds`
  console.log(`Products Table: started at ${start}, finished at ${end}`)
  return
};
