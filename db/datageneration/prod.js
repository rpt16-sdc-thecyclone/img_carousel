const faker = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: '././product.csv',
  header: [
    {id: 'name', title: 'name'}
  ]
})

let generateProdData = () => {
  var fakeProducts = [];
  for (var i = 0; i <= 1000000; i++) {
    if (i === 0) {
      fakeProducts.push({name: 'Star Wars Super Deluxe 24" Talking Plush: Chewbacca'});
    } else {
      fakeProducts.push({name: faker.random.words(3)});
    }
    if(i % 10000 === 0) {
      csvWriter.writeRecords(fakeProducts)
      .catch((err) => console.log(err))
    }
  }
  console.log('product data generated')

}

generateProdData()

