const fs = require('fs');


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
  for (var i = 1; i <= 100; i++) {
    //Select random amount of images for product
    imgCnt = Math.floor(Math.random() * 7) + 1;
    csvStr += productImages(imgCnt, i);

    if(i % 50 === 0) {
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
