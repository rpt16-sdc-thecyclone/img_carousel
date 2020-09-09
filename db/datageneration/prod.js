const faker = require('faker');
const fs = require('fs');

const generateProdData = () => {
  console.log('starting time', new Date())
  let writeStream = fs.createWriteStream('product.csv')
  var fakeProducts = "id,name\n";
  // var fakeProducts = "";


  (async () => {
    for (var i = 1; i <= 10000000; i++) {
      if (i === 0) {
        fakeProducts += i + ',' + 'Star Wars Super Deluxe 24" Talking Plush: Chewbacca\n';
      } else if (i === 9750000){
        fakeProducts += i + ','+ 'Super Watch Test Watch\n';
      } else {
        fakeProducts += i + ',' + faker.commerce.productName(3) + ' Watch' + '\n';
      }
      if (!writeStream.write(fakeProducts)) {
        await new Promise (resolve => writeStream.once('drain', resolve))
      }
      fakeProducts = ''
    }
  })();


  writeStream.on('finish', () => {
    console.log(new Date())
    console.log('product data generated')
  })

}

generateProdData()


// New total to gen 10 million product names 