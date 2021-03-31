// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'gallery',
      user: 'nameone',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'mysql',
    connection: {
      // host: process.env.MYSQL_HOST || '127.0.0.1',
      host: process.env.MYSQL_HOST,
      // port: 3306,
      database: 'gallery',
      user: 'fec_gallery',
      password: '123',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

};
