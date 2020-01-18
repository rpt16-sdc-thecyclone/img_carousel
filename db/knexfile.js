// Update with your config settings.
const connectionString = 'postgressql://ec2-54-244-137-205.us-west-2.compute.amazonaws.com/gallery'
// 'postgressql://ec2-54-244-137-205.us-west-2.compute.amazonaws.com:80/gallery'

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host:'ec2-54-244-137-205.us-west-2.compute.amazonaws.com',
      user: 'gallery',
      password: null,
      database: 'gallery',
      port: 80,
    },
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds'
    },
    useNullAsDefault: true
  },

  test: {
    client: 'pg',
    connection: connectionString,
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: connectionString,
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds'
    },
    useNullAsDefault: true
  },

};
