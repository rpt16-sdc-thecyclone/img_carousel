const environment = process.env.ENVIRONMENT || 'development';
const config = require('./knexfile')[environment];
const knex = require('knex')(config);

const getProductImages = function (id, callback) {
  const queries = [];

  queries.push(knex('products').where('id', id));
  queries.push(knex('images').where('product_id', id));

  Promise.all(queries)
    .then((results) => {
      callback(null, results);
    })
    .catch((err) => {
      callback(err);
    });
};

const deleteItem = function (id, callback) {
  console.log('delete path hit')
  knex('images')
  .where('product_id', id)
  .del()
  .then(res => {
    if (res > 0) {
      callback(null, 200)
    } else {
      console.log('No files to delete')
      callback(null, 'No files to delete for product')
    }
  })
  .catch(err => {
    console.log('inside del catch', err)
    callback(err)
  })

}

module.exports = {
  getProductImages,
  deleteItem,
};
