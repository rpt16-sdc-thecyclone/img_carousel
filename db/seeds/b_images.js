
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('images').del()
    .then(function () {
      return knex.raw(`ALTER SEQUENCE images_id_seq RESTART WITH 1`);
    })
    .then(function () {
      //insert records from img.csv
      return knex.raw(`COPY images(img_small,img_large,img_zoom,product_id) FROM '/Users/troymclaughlin/Desktop/img_carousel/img.csv' DELIMITER ',' CSV HEADER`)
    });
};
