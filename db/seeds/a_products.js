var faker = require('faker');
const copyFrom = require('pg-copy-streams').from;
const fs = require()

exports.seed = function(knex, Promise) {
  return knex('products').del()
  .then(function () {
    return knex.raw(`ALTER SEQUENCE products_id_seq RESTART WITH 1`);
  })
  //curr error id argument id must be type string, getting undefined
  .then(()=> {
    var stream = client.query(copyFrom(`COPY products FROM STDIN`));
    var fileStream = fs.createReadStream('../../product.csv')
    fileStream.on('error', done);
    stream.on('error', done);
    stream.on('end', done);
    fileStream.pipe(stream)
  })
  .catch((err) => console.log(err))
}

// exports.seed = function(knex) {
//   // Deletes ALL existing entries
//   return knex('products').del()
//     .then(function () {
//       return knex.raw(`ALTER SEQUENCE products_id_seq RESTART WITH 1`);
//     })
//     .then(function () {
//       //Insert previously generated data from product.csv file
//       return knex.raw(`COPY products(name) FROM '/Users/troymclaughlin/Desktop/img_carousel/product.csv' DELIMITER ',' CSV HEADER`);
//     });
// };
