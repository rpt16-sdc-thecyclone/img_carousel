var faker = require('faker');

exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      return knex.raw('ALTER TABLE ' + 'products' + ' AUTO_INCREMENT = 1')
    })
    .then( async () => {
      //Create array of fake products
      var fakeProducts = [];
      for (var i = 0; i < 500001; i++) {
        if (i === 0) {
          fakeProducts.push({name: 'Star Wars Super Deluxe 24" Talking Plush: Chewbacca'});
        } else {
          fakeProducts.push({name: faker.random.words(3)});
        }
        if ( i % 5000 === 0) {
          await knex('products').insert(fakeProducts);
          fakeProducts = [];
        }
      }
    });
};

