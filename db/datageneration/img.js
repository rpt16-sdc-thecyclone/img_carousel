const fs = require('fs');


var productImages = function(imgCnt, id) {
  //Variable for set of S3 stored images
  var imageList = [
    'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64.jpg,https://fec-product-images.s3.us-east-2.amazonaws.com/s-l500.jpg,https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600.jpg,',
    'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64+(1).jpg,https://fec-product-images.s3.us-east-2.amazonaws.com/s-l500+(1).jpg,https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600+(1).jpg,',
    'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64+(2).jpg,https://fec-product-images.s3.us-east-2.amazonaws.com/s-l500+(2).jpg,https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600+(2).jpg,',
    'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64+(3).jpg,https://fec-product-images.s3.us-east-2.amazonaws.com/s-l500+(3).jpg,https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600+(3).jpg,',
    'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64+(4).jpg,https://fec-product-images.s3.us-east-2.amazonaws.com/s-l500+(4).jpg,https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600+(4).jpg,',
    'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64+(5).jpg,https://fec-product-images.s3.us-east-2.amazonaws.com/s-l500+(5).jpg,https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600+(5).jpg,',
    'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64+(6).jpg,https://fec-product-images.s3.us-east-2.amazonaws.com/s-l500+(6).jpg,https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600+(6).jpg,',
    'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64+(7).jpg,https://fec-product-images.s3.us-east-2.amazonaws.com/s-l300+(1).jpg,https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600+(7).jpg,',
    'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64+(8).jpg,https://fec-product-images.s3.us-east-2.amazonaws.com/s-l500+(2).jpg,https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600+(8).jpg,',
    'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64+(9).jpg,https://fec-product-images.s3.us-east-2.amazonaws.com/s-l500+(3).jpg,https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600+(9).jpg,',
    'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64+(10).jp,https://fec-product-images.s3.us-east-2.amazonaws.com/s-l500+(4).jpg,https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600+(10).jpg,',
  ];

  //Specific data for product #1 that is coordinated between projects
  var prodOneList =
    'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64_chew1.jpg,https://fec-product-images.s3.us-east-2.amazonaws.com/s-l500_chew1.jpg,https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600_chew1.jpg,1\nhttps://fec-product-images.s3.us-east-2.amazonaws.com/s-l64_chew2.jpg,https://fec-product-images.s3.us-east-2.amazonaws.com/s-l500_chew2.jpg,https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600_chew2.jpg,1'
  ;
  var result = "";
  if (id === 1) {
    result += prodOneList + '\n';
  } else {
    let images = imageList.slice(0, imgCnt);
    for (var i = 0; i < imgCnt; i++) {
      result += images[i] + id + '\n';
    }
  }
  return result
};

const generateImgData = () => {
  let writeStream = fs.createWriteStream('img.csv');
  var imgCnt;
  var csvStr = 'img_small,img_large,img_zoom,product_id\n';
  for (var i = 1; i <= 50000; i++) {
    //Select random amount of images for product
    imgCnt = Math.floor(Math.random() * 8) + 1;
    csvStr += productImages(imgCnt, i);

    if(i % 1000 === 0) {
      writeStream.write(csvStr)
      csvStr = '';
    }
  }
  writeStream.on('finish', () => {
    console.log('wrote all data to file')
  })
  console.log('img data finished')

}
generateImgData()
