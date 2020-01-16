const { Pool, Client } = require('pg');

const client = new Client({
  user: 'gallery',
  host: 'localhost',
  database: 'gallery',
  password: 'password',
  port: 5432,
})

var startTime = new Date();
var start = `started at ${startTime.getHours()}:${startTime.getMinutes()} and ${startTime.getSeconds()}.${startTime.getMilliseconds()} seconds`

client.connect()
//clear all existing data from both tables
client.query('TRUNCATE TABLE products CASCADE', (err, res) => {
  if (err) {
    console.log(err)
  }
  console.log('product table data cleared', res)
})
//reset id count to 1 for product table
client.query(`ALTER SEQUENCE products_id_seq RESTART WITH 1`, (err,res) => {
  if (err) console.log(err)
  console.log('id count for products reset', res)
})
//reset id count to 1 for images table
client.query(`ALTER SEQUENCE images_id_seq RESTART WITH 1`, (err,res) => {
  if (err) console.log(err)
  console.log('id count for images reset', res)
})
//copy data from product.csv to products table
client.query(`COPY products(name) FROM '/Users/troymclaughlin/Desktop/img_carousel/product.csv' DELIMITER ',' CSV HEADER`, (err, res) => {
  if (err) {
    console.log(err)
  }
  console.log('porducts.csv copied', res)
})
//copy data from img.csv to images table
client.query(`COPY images(img_small,img_large,img_zoom,product_id) FROM '/Users/troymclaughlin/Desktop/img_carousel/img.csv' DELIMITER ',' CSV HEADER`, (err, res) => {
  if (err) {
    console.log(err)
  }
  let endTime = new Date()
  var end = `started at ${endTime.getHours()}:${endTime.getMinutes()} and ${endTime.getSeconds()}.${endTime.getMilliseconds()} seconds`
  console.log(`started at ${start}, finished at ${end}`, res)

  client.end()
})