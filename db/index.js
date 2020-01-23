const environment = process.env.ENVIRONMENT || 'development';
const config = require('./knexfile')[environment];
const knex = require('knex')(config);
const faker = require('faker');

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
  let prod = faker.lorem.words(3)
  knex('products')
  .returning('id')
  .insert({name: prod})
  // .then(()=> knex('products').where('name', prod))
  .then(res => {
    console.log('results of adding products table',res[0])
    knex('images')
    .insert([{
      img_small: 'https://sdc-the-cyclone.s3-us-west-2.amazonaws.com/SDC+S3+img/watch9sml.jpg',
      img_large: 'https://sdc-the-cyclone.s3-us-west-2.amazonaws.com/SDC+S3+img/watch9lg.jpg',
      img_zoom: 'https://sdc-the-cyclone.s3-us-west-2.amazonaws.com/SDC+S3+img/watch9zoom.jpg',
      product_id: res[0],
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
