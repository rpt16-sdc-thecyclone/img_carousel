const environment = process.env.ENVIRONMENT || 'development';
const config = require('./knexfile')[environment];
const knex = require('knex')(config);
const faker = require('faker');

exports.getProductImages = async (id) =>  {
  const queries = [];

  let product = await knex('products').where('id', id);
  let images =  await knex('images').where('product_id', id);

  queries.push(product);
  queries.push(images);

  return queries;
};

exports.addItem = async () => {
  let prod = faker.lorem.words(3)

  let productId = await knex('products').returning('id').insert({name: prod})[0];

  let addImages = await knex('images').insert([{
    img_small: 'https://sdc-the-cyclone.s3-us-west-2.amazonaws.com/SDC+S3+img/watch9sml.jpg',
    img_large: 'https://sdc-the-cyclone.s3-us-west-2.amazonaws.com/SDC+S3+img/watch9lg.jpg',
    img_zoom: 'https://sdc-the-cyclone.s3-us-west-2.amazonaws.com/SDC+S3+img/watch9zoom.jpg',
    product_id: productId,
  }]);

  return addImages
};

exports.editItem = async (id) => {
  let results = await knex('products')
    .where({id: id})
    .update({name: 'This item was updated'})

  return results
};

exports.deleteItem = async (id, callback) => {
  let results = await knex('images')
    .where('product_id', id)
    .del()

  if (results > 0) {
    return 200
  }
  return 'No files to delete for product'

}

