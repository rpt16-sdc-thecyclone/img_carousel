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

const addItem = function(callback) {
  knex('products')
  .insert({name: 'New Item added!!!!'})
  .then(res => {
    knex('images')
    .insert([{
      img_small: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l64.jpg',
      img_large: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l500.jpg',
      img_zoom: 'https://fec-product-images.s3.us-east-2.amazonaws.com/s-l1600.jpg',
      product_id: res,
    }])
    .then(result => {
      if (result) {
        callback(null, result)
      } else {
        callback('error updating')
      }
    })
  })
  .catch(err=> {
    console.log(err)
    callback(err)
  })
};

const editItem = function (id, callback) {
  knex('products')
  .where({id: id})
  .update({name: 'This item was updated'})
  .then(res => {
    if (res > 0) {
      callback(null, 200)
    } else {
      callback(null, 'No file to update')
    }
  })
  .catch(err => {
    console.log(err);
    callback(err)
  })
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
  addItem,
  editItem,
};
