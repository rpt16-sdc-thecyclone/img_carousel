const faker = require('faker');
const fs = require('fs');
const { resolve } = require('path');

console.log(new Date())
const generateProdData = () => {
  let writeStream = fs.createWriteStream('product.csv')
  var fakeProducts = "name\n";


  (async () => {
    for (var i = 1; i <= 10000000; i++) {
      if (i === 0) {
        fakeProducts +='Star Wars Super Deluxe 24" Talking Plush: Chewbacca\n';
      } else if (i === 9750000){
        fakeProducts += 'Super Watch Test\n';
      } else {
        fakeProducts += faker.commerce.productName(3) + '\n';
      }
      if (!writeStream.write(fakeProducts)) {
        await new Promise (resolve => writeStream.once('drain', resolve))
      }
      fakeProducts = ''
    }
  })();


  writeStream.on('finish', () => {
    console.log(new Date())
  })
  console.log(new Date())
  console.log('product data generated')
}
console.log(new Date())
generateProdData()


// New total to gen 10 million product names 20.11.18.780 to 20.11.18.793 or .013 miliseconds