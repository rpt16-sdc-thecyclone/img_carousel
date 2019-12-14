// Update with your config settings.
const connectionString = 'postgressql://postgres@localhost:5432/gallery'

module.exports = {

  development: {
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
    connection: process.env.DataBase_URL,
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds'
    },
    useNullAsDefault: true
  },

};
