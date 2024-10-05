module.exports = {

  development: {
    client: 'postgresql', // Change from 'sqlite3' to 'postgresql'
    connection: {
      host: '127.0.0.1', // or your PostgreSQL host
      user: process.env.PGUSER || 'postgres', // replace with actual username
      password: process.env.PGPASSWORD || 'FVxIKHwREnaNUleMsPPkyormbdQkZkNd', // replace with actual password
      database: process.env.PGDATABASE || 'sensai', // replace with actual database name
      port: 5432 // default PostgreSQL port
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },

  staging: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
