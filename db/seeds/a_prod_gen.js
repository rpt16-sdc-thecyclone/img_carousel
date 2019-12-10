var faker = require('faker');
const fs = require('fs');
const fsPromises = require('fs').promises;


const prodDataGen = () => {
  let writeStream = fs.createWriteStream('product.csv')
  var fakeProducts = "name,\n";
  for (var i = 1; i <= 1000000; i++) {
    if (i === 0) {
      fakeProducts +='Star Wars Super Deluxe 24" Talking Plush: Chewbacca,\n';
    } else {
      fakeProducts += faker.random.words(3) + ',\n';
    }
    if ( i % 2500 === 0) {
      writeStream.write(fakeProducts)
      fakeProducts = "";
    }
  }
  writeStream.on('finish', () => {
    console.log('wrote all data to file')
  })

}

prodDataGen()


