const fs = require('fs');
const knex = require('knex')(config);
const copyFrom = require('pg-copy-streams');


exports.seed = async (kleenx) => {

  console.log(knex.clinet)

  // console.log('what is this', knex)
  // knex.clinet.pool.acquire((err, clinet) => {
  //   done = (err) => {
  //     connection.clinet.pool.release(clinet)
  //     if(err) console.log(err)
  //     else console.log('success')
  //   }
  //   const stream = client.query(copyFrom('Copy products from STDIN'));
  //   const fileStream = fs.createReadStream('products.csv');
  //   fileStream.on('error', done)
  //   fileStream.pipe(stream).on('finish', done).on('error', done)
  // })

};
