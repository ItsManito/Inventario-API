require('dotenv').config();

const common = {
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_NAME || 'inventario_db',
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5433,
  dialect: process.env.DB_DIALECT || 'postgres',
  logging: false
};

module.exports = {
  development: { ...common },
  test: { ...common, database: (process.env.DB_NAME || 'inventario_db') + '_test' },
  production: { ...common }
};
