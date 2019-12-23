const faker = require('faker');
const fs = require('fs');


const generateProdData = () => {
  let writeStream = fs.createWriteStream('product.csv')
  var fakeProducts = "name\n";
  for (var i = 1; i <= 10000000; i++) {
    if (i === 0) {
      fakeProducts +='Star Wars Super Deluxe 24" Talking Plush: Chewbacca\n';
    } else {
      fakeProducts += faker.lorem.words(3) + '\n';
    }
    if ( i % 5000=== 0) {
      writeStream.write(fakeProducts)
      fakeProducts = "";
    }
  }
  writeStream.on('finish', () => {
    console.log('wrote all data to file')
  })
  console.log('product data generated')
}
generateProdData()

// const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// const csvWriter = createCsvWriter({
//   path: '././product.csv',
//   header: [
//     {id: 'name', title: 'name'}
//   ]
// })

// let generateProdData = () => {
//   var fakeProducts = [];
//   for (var i = 0; i <= 1000; i++) {
//     if (i === 0) {
//       fakeProducts.push({name: 'Star Wars Super Deluxe 24" Talking Plush: Chewbacca'});
//     } else {
//       fakeProducts.push({name: faker.random.words(3)});
//     }
//     if(i % 10 === 0) {
//       csvWriter.writeRecords(fakeProducts)
//       .catch((err) => console.log(err))
//     }
//   }
//   console.log('product data generated')

// }

// generateProdData()

