// const fs = require('fs');

// exports.seed = function(knex, Promise) {
//   return knex('products').del()
//   .then(function () {
//     return knex.raw(`ALTER SEQUENCE products_id_seq RESTART WITH 1`);
//   })
//   //curr error id argument id must be type string, getting undefined
//   .then( async () => {
//     //Stream CSV file and write to database
//     let readStream = fs.createReadStream('../img.csv', 'utf-8');

//     readStream.on('data', function(chunk) {
//       knex('images').insert(chunk);
//     }).on('end', function() {
//       console.log('image data written to database')
//     })
//   });
// }

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
