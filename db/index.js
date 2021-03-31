const environment = process.env.ENVIRONMENT || 'development';
const knex = require('knex')(config);
const faker = require('faker');
const config = require('./knexfile')[environment];

exports.getProductImages = async (id) => {
  const queries = [];

  const product = await knex('products').select('name').where('id', id);
  const images = await knex('images').select('img_small', 'img_large', 'img_zoom').where('product_id', id);

  queries.push(product);
  queries.push(images);

  return queries;
};

exports.addItem = async () => {
  const prod = faker.lorem.words(3);

  const productId = await knex('products').returning('id').insert({ name: prod })[0];

  const addImages = await knex('images').insert([{
    img_small: 'https://sdc-the-cyclone.s3-us-west-2.amazonaws.com/SDC+S3+img/watch9sml.jpg',
    img_large: 'https://sdc-the-cyclone.s3-us-west-2.amazonaws.com/SDC+S3+img/watch9lg.jpg',
    img_zoom: 'https://sdc-the-cyclone.s3-us-west-2.amazonaws.com/SDC+S3+img/watch9zoom.jpg',
    product_id: productId,
  }]);

  return addImages;
};

exports.editItem = async (id) => {
  const results = await knex('products')
    .where({ id })
    .update({ name: 'This item was updated' });

  return results;
};

exports.deleteItem = async (id) => {
  const results = await knex('images')
    .where('product_id', id)
    .del();

  if (results > 0) {
    return 200;
  }
  return 'No files to delete for product';
};
