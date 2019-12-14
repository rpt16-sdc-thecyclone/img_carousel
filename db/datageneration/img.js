var faker = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: '././img.csv',
  header: [
    {id: 'img_small', title: 'img_small'},
    {id: 'img_large', title: 'img_large'},
    {id: 'img_zoom', title: 'img_zoom'},
    {id: 'product_id', title: 'product_id'}
  ]
})


var productImages = function(imgCnt, id) {
  //Variable for set of S3 stored images
  var imageList = [
    {img_small: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64.jpg', img_large: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l500.jpg', img_zoom: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600.jpg'},
    {img_small: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64+(1).jpg', img_large: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l500+(1).jpg', img_zoom: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600+(1).jpg'},
    {img_small: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64+(2).jpg', img_large: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l500+(2).jpg', img_zoom: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600+(2).jpg'},
    {img_small: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64+(3).jpg', img_large: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l500+(3).jpg', img_zoom: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600+(3).jpg'},
    {img_small: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64+(4).jpg', img_large: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l500+(4).jpg', img_zoom: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600+(4).jpg'},
    {img_small: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64+(5).jpg', img_large: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l500+(5).jpg', img_zoom: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600+(5).jpg'},
    {img_small: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64+(6).jpg', img_large: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l500+(6).jpg', img_zoom: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600+(6).jpg'},
    {img_small: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64+(7).jpg', img_large: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l300+(1).jpg', img_zoom: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600+(7).jpg'},
    {img_small: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64+(8).jpg', img_large: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l500+(2).jpg', img_zoom: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600+(8).jpg'},
    {img_small: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64+(9).jpg', img_large: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l500+(3).jpg', img_zoom: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600+(9).jpg'},
    {img_small: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64+(10).jpg', img_large: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l500+(4).jpg', img_zoom: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600+(10).jpg'}
  ];

  //Specific data for product #1 that is coordinated between projects
  var prodOneList = [
    {product_id: 1, img_small: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64_chew1.jpg', img_large: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l500_chew1.jpg', img_zoom: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600_chew1.jpg'},
    {product_id: 1, img_small: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64_chew2.jpg', img_large: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l500_chew2.jpg', img_zoom: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600_chew2.jpg'}
  ];

  var result;

  if (id === 1) {
    result = prodOneList;
  } else {
    result = imageList.slice(0, imgCnt);
    for (var i = 0; i < imgCnt; i++) {
      result[i]['product_id'] = id;
    }
  }
  // console.log(result);
  return result
};

const generateImgData = () => {
  var imgCnt;
  var insertArr = [];
  for (var i = 1; i <= 100000; i++) {
    //Select random amount of images for product
    imgCnt = Math.floor(Math.random() * 8) + 1;
    let oneProdRecords = productImages(imgCnt, i);
    oneProdRecords.forEach(record => {
      insertArr.push(record)
    })
    if(i % 2500 === 0) {
      csvWriter.writeRecords(insertArr)
        .catch((err) => console.log(err))
      insertArr = []
    }
  }
  console.log('img data generated')
};
generateImgData()