const { getProductImages,
        addItem,
        editItem,
        deleteItem
} = require('../../db/index');

exports.fetchProductImages = async (req, res) => {
  const { id } = req.query;

  let results = await getProductImages(id)
  const data = { name: results[0][0].name };
  const imgArray = results[1].map((x) => (
    {
      small: x.img_small,
      large: x.img_large,
      zoom: x.img_zoom,
    }
  ));
  data.images = imgArray;
  console.log('get request fulfilled');
  res.status(200).send(data);

};

exports.addProductImages = async (req, res) => {
  let result =  await addItem()
  res.status(200).send(result)

};

exports.updateProductImages = async (req, res) => {
  const id = req.query.prod_id;
  let result = await editItem(id)
  res.send(result)

};

exports.deleteProductImages = async (req, res) => {
  const id = req.query.prod_id;
  let result = deleteItem(id)
  res.send(result)
};