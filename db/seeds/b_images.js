exports.seed = async (knex) => {

  var startTime = new Date();
  var start = `Images Table: started at ${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}.${startTime.getMilliseconds()} seconds`

  await knex('images').del();

  await knex.raw(`ALTER SEQUENCE images_id_seq RESTART WITH 1`);
  await knex.raw(`ALTER TABLE images DISABLE TRIGGER ALL`);

  await knex.raw(`Copy images(id,img_small,img_large,img_zoom,product_id) FROM '/Users/troymclaughlin/Documents/projects/sdc/img-carousel-microservice/img.csv' DELIMITER ',' CSV HEADER`);

  await knex.raw(`ALTER TABLE products ENABLE TRIGGER ALL`);

  let endTime = new Date()
  var end = `started at ${endTime.getHours()}:${endTime.getMinutes()}:${endTime.getSeconds()}.${endTime.getMilliseconds()} seconds`
  console.log(`Images Table: started at ${start}, finished at ${end}`)
  return
};
