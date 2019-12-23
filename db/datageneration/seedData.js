const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1'
})

client.connect(function (err) {
  if(err) {
    console.log('connection error', err)
  } else {
    console.log('connected to cassandra')
  }
})

const query = `COPY carousel.products FROM '/Users/troymclaughlin/Desktop/img_carousel/img.csv' WITH DELIMITER=',' and HEADER=TRUE`

client.execute(query, (err, res) => {
  if(err) {
    console.log('error occured with csv insert', err)
  } else {
    console.log(result)
  }

})