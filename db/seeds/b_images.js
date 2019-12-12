var faker = require('faker');
const fs = require('fs');

//return knex('images').insert(result);

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('images').del()
    .then(function () {
      return knex.raw('ALTER TABLE ' + 'images' + ' AUTO_INCREMENT = 1');
    })
    .then( async () => {
      //Stream CSV file and write to database
      let readStream = fs.createReadStream('../img.csv', 'utf-8');

      readStream.on('data', function(chunk) {
        knex('images').insert(chunk);
      }).on('end', function() {
        console.log('image data written to database')
      })
    });
    // .then( async () => {

    //   // Inserts seed entries
    //   var imgCnt;
    //   var insertArr = [];
    //   for (var i = 1; i < 500001; i++) {
    //     //Select random amount of images for product
    //     imgCnt = Math.floor(Math.random() * 8) + 1;

    //     insertArr.push(productImages(knex, imgCnt, i));

    //     if(i % 5000 === 0) {
    //       await Promise.all(insertArr)
    //       insertArr = [];
    //     }
    //   }

    // });
};

