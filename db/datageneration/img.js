const fs = require('fs');
// const { resolve } = require('path');

let rowId = 3;
var productImages = function(imgCnt, id) {
  //Variable for set of S3 stored images
  var imageList = [
    'https://sdc-the-cyclone.s3-us-west-2.amazonaws.com/SDC+S3+img/watch1sml.jpg,https://sdc-the-cyclone.s3-us-west-2.amazonaws.com/SDC+S3+img/watch1lg.jpg,https://sdc-the-cyclone.s3-us-west-2.amazonaws.com/SDC+S3+img/watch1zoom.jpg,',
    'https://sdc-the-cyclone.s3-us-west-2.amazonaws.com/SDC+S3+img/watch2sml.jpg,https://sdc-the-cyclone.s3-us-west-2.amazonaws.com/SDC+S3+img/watch2lg.jpg,https://sdc-the-cyclone.s3-us-west-2.amazonaws.com/SDC+S3+img/watch2zoom.jpg,',
    'https://sdc-the-cyclone.s3-us-west-2.amazonaws.com/SDC+S3+img/watch3sml.jpg,https://sdc-the-cyclone.s3-us-west-2.amazonaws.com/SDC+S3+img/watch3lg.jpg,https://sdc-the-cyclone.s3-us-west-2.amazonaws.com/SDC+S3+img/watch3zoom.jpg,',
    'https://sdc-the-cyclone.s3-us-west-2.amazonaws.com/SDC+S3+img/watch4sml.jpg,https://sdc-the-cyclone.s3-us-west-2.amazonaws.com/SDC+S3+img/watch4lg.jpg,https://sdc-the-cyclone.s3-us-west-2.amazonaws.com/SDC+S3+img/watch4zoom.jpg,',
    'https://sdc-the-cyclone.s3-us-west-2.amazonaws.com/SDC+S3+img/watch5sml.jpg,https://sdc-the-cyclone.s3-us-west-2.amazonaws.com/SDC+S3+img/watch5lg.jpg,https://sdc-the-cyclone.s3-us-west-2.amazonaws.com/SDC+S3+img/watch5zoom.jpg,',
    'https://sdc-the-cyclone.s3-us-west-2.amazonaws.com/SDC+S3+img/watch6sml.jpg,https://sdc-the-cyclone.s3-us-west-2.amazonaws.com/SDC+S3+img/watch6lg.jpg,https://sdc-the-cyclone.s3-us-west-2.amazonaws.com/SDC+S3+img/watch6zoom.jpg,',
    'https://sdc-the-cyclone.s3-us-west-2.amazonaws.com/SDC+S3+img/watch7sml.jpg,https://sdc-the-cyclone.s3-us-west-2.amazonaws.com/SDC+S3+img/watch7lg.jpg,https://sdc-the-cyclone.s3-us-west-2.amazonaws.com/SDC+S3+img/watch7zoom.jpg,',
    'https://sdc-the-cyclone.s3-us-west-2.amazonaws.com/SDC+S3+img/watch8sml.jpg,https://sdc-the-cyclone.s3-us-west-2.amazonaws.com/SDC+S3+img/watch8lg.jpg,https://sdc-the-cyclone.s3-us-west-2.amazonaws.com/SDC+S3+img/watch8zoom.jpg,',
    'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64+(8).jpg,https://fec-product-images.s3.us-east-2.amazonaws.com/s-l500+(2).jpg,https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600+(8).jpg,',
    'https://sdc-the-cyclone.s3-us-west-2.amazonaws.com/SDC+S3+img/watch9sml.jpg,https://sdc-the-cyclone.s3-us-west-2.amazonaws.com/SDC+S3+img/watch9lg.jpg,https://sdc-the-cyclone.s3-us-west-2.amazonaws.com/SDC+S3+img/watch9zoom.jpg,',
  ];

  //Specific data for product #1 that is coordinated between projects
  var prodOneList =
    '1,https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64_chew1.jpg,https://fec-product-images.s3.us-east-2.amazonaws.com/s-l500_chew1.jpg,https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600_chew1.jpg,1\n2,https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64_chew2.jpg,https://fec-product-images.s3.us-east-2.amazonaws.com/s-l500_chew2.jpg,https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600_chew2.jpg,1'
  ;
  var result = "";
  if (id === 1) {
    result += prodOneList + '\n';
  } else {
    // let images = imageList.slice(0, imgCnt);
    // for (var i = 0; i < imgCnt; i++) {
    //   result += rowId + ',' + images[i] + id + '\n';
    //   rowId++;
    // }
    for (var i = 0; i < imgCnt; i++) {
      result += rowId + ',' + imageList[i] + id + '\n';
      rowId++;
    }
  }
  return result
};


const generateImgData =  async () => {
  console.log('start of data generation', new Date())
  const file = fs.createWriteStream('img.csv');
  let csvString = 'id,img_small,img_large,img_zoom,product_id\n';

  for (let i = 1; i < 10000001; i++) {
    imgCount = Math.floor(Math.random() * 9) + 1;
    csvString += productImages(imgCount, i);

    if(!file.write(csvString)) {
      await new Promise(resolve => file.once('drain', resolve))
    }
    csvString = ''

  }
  file.on('finish', () => {
    console.log('is this running', new Date())
  })

  console.log('end of function time', new Date())
}
generateImgData()

// New total to gen 10 million product names 20.56.46.027 to 20.58.07.180 or 2 min 38 seconds 