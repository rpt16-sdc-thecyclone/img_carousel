const fs = require('fs');
const {Pool} = require('pg');
const copyFrom = require('pg-copy-streams').from;

const pool = new Pool();
//error that release alread been called - I think means connection alreay been made with db
pool.connect(function(err, client, done) {
  let stream = client.query(copyFrom(`COPY products FROM STDIN '/Users/troymclaughlin/Desktop/img_carousel/product.csv'`));
  let fileStream = fs.createReadStream('./../product.csv')
  fileStream.on('error', done);
  stream.on('error', done)
  stream.on('end', done);
  fileStream.pipe(stream)
})