const express = require('express');

const path = require('path');

const app = express();
const PORT = 3003;

const db = require('../db/index.js');

app.use(express.static(path.join(__dirname, '/../public')));

app.get('/images', (req, res) => {
  const { id } = req.query;

  // Get data from database
  db.getProductImages(id, (err, results) => {
    if (err) {
      console.log('Query error: ', err);
    }
    // console.log('Query results: ', results);
    // console.log(results[0][0].name);
    const data = { name: results[0][0].name };
    const imgArray = results[1].map((x) => (
      {
        small: x.img_small,
        large: x.img_large,
        zoom: x.img_zoom,
      }
    ));
    data.images = imgArray;
    console.log(data);
    res.status(200).send(data);
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
