const seeder = require('knex-csv-seeder');

exports.seed = seeder({
  table: 'products',
  file: '../product.csv'
})


// var faker = require('faker');
// const fs = require('fs');

// exports.seed = (knex) => {
//   // Deletes ALL existing entries
//   return knex('products').del()
//     .then(function () {
//       return knex.raw('ALTER TABLE ' + 'products' + ' AUTO_INCREMENT = 1')
//     })
//     .then( async () => {
//       //Stream CSV file and write to database
//       let readStream = fs.createReadStream('../product.csv','utf-8');

//       readStream.on('data', function(chunk) {
//         console.log(chunk)
//         knex('products').insert(chunk);
//       }).on('end', function() {
//         console.log('product data written to database')
//       })
//     });
// };

