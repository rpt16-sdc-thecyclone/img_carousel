const  redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient({
  host: 'ec2-54-187-4-50.us-west-2.compute.amazonaws.com',
  port: 6379,
});

client.on("error", function(error) {
  console.error(error);
});

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

exports.addToCache= async (id, data) => {
  try {
    await setAsync(id, JSON.stringify(data));
    console.log('cached')
    return
  } catch(err) {
    console.log(err)
    return
  }
}

exports.checkCache = async (req, res, next) => {
  const { id } = req.query;
  console.log('checking cache')
  try {
    let data = await getAsync(id)
    if(data !== null) {
      console.log('here ',data)
      data = JSON.parse(data)
      res.send(data)
    } else {
      next()
    }
  } catch(err) {
    res.status(500).send(err)
  }
}