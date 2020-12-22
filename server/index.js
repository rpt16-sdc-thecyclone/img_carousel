require('newrelic');
const express = require('express');
const path = require('path');
const compression = require('compression');
const { checkCache } = require('../db/redisCache.js');


const app = express();
const PORT = process.env.PORT || 3003;

const {
  fetchProductImages,
  addProductImages,
  updateProductImages,
  deleteProductImages
} = require('./contoller/imagesControlle');

app.use(compression());
app.use(express.static(path.join(__dirname, '/../public')));

app.get('/images', checkCache, fetchProductImages);
app.post('/images', addProductImages);
app.patch('/images', updateProductImages);
app.delete('/images', deleteProductImages);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app;
