const { Pool, Client } = require('pg');
const fs = require('fs');
const copyFrom = require('pg-copy-streams').from;

// const client = new Client({
//   host: 'localhost',
//   database: 'gallery',
//   password: null,
//   port: 5432,
// })

let runSeedScriptNPMPackage = async () => {

  var startTime = new Date();
  var start = `started at ${startTime.getHours()}:${startTime.getMinutes()} and ${startTime.getSeconds()}.${startTime.getMilliseconds()} seconds`

  const pool = new Pool({
    host: 'localhost',
    database: 'gallery',
    password: null,
    port: 5432,
  });
  const poolClient = await pool.connect()

  // clear all existing data from both tables
  await poolClient.query('TRUNCATE TABLE products CASCADE')
  // reset id count to 1 for product table
  await poolClient.query(`ALTER SEQUENCE products_id_seq RESTART WITH 1`)
  // reset id count to 1 for images table
  await poolClient.query(`ALTER SEQUENCE images_id_seq RESTART WITH 1`)
  // load data from product.csv to products table
  await poolClient.query(`ALTER TABLE images SET UNLOGGED`)
  await poolClient.query(`ALTER TABLE products SET UNLOGGED`)

  const done = (err) => {
    poolClient.release();
    if(err) {
      console.log(err)
      return
    } else {
      let endTime = new Date()
      var end = `started at ${endTime.getHours()}:${endTime.getMinutes()} and ${endTime.getSeconds()}.${endTime.getMilliseconds()} seconds`
      console.log(`started at ${start}, finished at ${end}`)
      return
    }
  }

  const seedProducts = () => {
    const stream = poolClient.query(copyFrom(`Copy products(id,name) From STDIN DELIMITER ','`));
    const productsStream = fs.createReadStream('/Users/troymclaughlin/Documents/projects/sdc/img-carousel-microservice/product.csv');

    productsStream.on('error', done)
    stream.on('error', done)
    stream.on('finish', seedImages)
    productsStream.pipe(stream)
  };

  const seedImages = () => {
    const stream = poolClient.query(copyFrom(`Copy images(id,img_small,img_large,img_zoom,product_id) From STDIN DELIMITER ','`));
    const imagesStream = fs.createReadStream('/Users/troymclaughlin/Documents/projects/sdc/img-carousel-microservice/img.csv');

    imagesStream.on('error', done)
    stream.on('error', done)
    stream.on('finish', done)
    imagesStream.pipe(stream)
  }

  runSeedScriptNPMPackage()

};
// runSeedScript().catch(e => console.error(e.message, e.stack))


const runSeedCopyCommand = async () => {

  var startTime = new Date();
  console.log(startTime)
  var start = `started at ${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}.${startTime.getMilliseconds()} seconds`

  const pool = new Pool({
    host: 'localhost',
    database: 'gallery',
    password: null,
    port: 5432,
  });

  const poolClient = await pool.connect()

  console.log('here')

  //clear all existing data from both tables
  await poolClient.query('TRUNCATE TABLE products CASCADE')
  //reset id count to 1 for tables
  await poolClient.query(`ALTER SEQUENCE products_id_seq RESTART WITH 1`)
  await poolClient.query(`ALTER SEQUENCE images_id_seq RESTART WITH 1`)

  // prepaire tables for data
  await poolClient.query(`ALTER TABLE products DISABLE TRIGGER ALL`)
  await poolClient.query(`ALTER TABLE images DISABLE TRIGGER ALL`)

  // copy data from product.csv to products table
  await poolClient.query(`Copy products(id,name) FROM '/Users/troymclaughlin/Documents/projects/sdc/img-carousel-microservice/product.csv' DELIMITER ',' CSV HEADER`)

  // copy data from img.csv to images table
  await poolClient.query(`Copy images(id,img_small,img_large,img_zoom,product_id) FROM '/Users/troymclaughlin/Documents/projects/sdc/img-carousel-microservice/img.csv' DELIMITER ',' CSV HEADER`)

  // relog tables for database use
  await poolClient.query(`ALTER TABLE products ENABLE TRIGGER ALL`)
  await poolClient.query(`ALTER TABLE images ENABLE TRIGGER ALL`)

  let endTime = new Date()
  var end = `started at ${endTime.getHours()}:${endTime.getMinutes()} and ${endTime.getSeconds()}.${endTime.getMilliseconds()} seconds`
  console.log(`started at ${start}, finished at ${end}`)

  poolClient.release();



}
runSeedCopyCommand().catch(e => console.error(e.message, e.stack))

// started at started at 11:21:12.643 seconds, finished at started at 11:34:11.494 seconds
