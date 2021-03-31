const {
  getProductImages,
  addItem,
  editItem,
  deleteItem,
} = require('../../db/index');
// const { addToCache } = require('../../db/redisCache.js');


exports.fetchProductImages = async (req, res) => {
  const { id } = req.query;

  const results = await getProductImages(id);
  const data = { name: results[0][0].name };
  const imgArray = results[1].map((x) => (
    {
      small: x.img_small,
      large: x.img_large,
      zoom: x.img_zoom,
    }
  ));
  data.images = imgArray;
  // addToCache(id, data);
  console.log('get request fulfilled');
  res.status(200).send(data);
};

exports.addProductImages = async (req, res) => {
  const result = await addItem();
  res.status(200).send(result);
};

exports.updateProductImages = async (req, res) => {
  const id = req.query.prod_id;
  const result = await editItem(id);
  res.send(result);
};

exports.deleteProductImages = async (req, res) => {
  const id = req.query.prod_id;
  const result = deleteItem(id);
  res.send(result);
};
