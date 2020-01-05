const faker = require('faker');
const fs = require('fs');


const generateProdData = () => {
  let writeStream = fs.createWriteStream('product.csv')
  var fakeProducts = "name\n";
  for (var i = 1; i <= 10000000; i++) {
    if (i === 0) {
      fakeProducts +='Star Wars Super Deluxe 24" Talking Plush: Chewbacca\n';
    } else if (i === 9750000){
      fakeProducts += 'Super Watch Test\n';
    } else {
      fakeProducts += faker.commerce.productName(3) + '\n';
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