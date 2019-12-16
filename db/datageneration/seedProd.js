const fs = require('fs');
const {Pool} = require('pg');
const copyFrom = require('pg-copy-streams').from;

const pool = new Pool();

pool.connect(function(err, client, done) {
  let stream = client.query(copyFrom(`COPY products FROM STDIN`));
  let fileStream = fs.createReadStream('./../product.csv')
  fileStream.on('error', done);
  stream.on('error', done)
  stream.on('end', done);
  fileStream.pipe(stream)
})