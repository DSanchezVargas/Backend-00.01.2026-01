require('dotenv').config();

const base = {
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'mini_learning',
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 5432),
  dialect: 'postgres',
  logging: process.env.DB_LOGGING === 'true'
};

module.exports = {
  development: { ...base },
  test: { ...base, database: process.env.DB_NAME_TEST || 'mini_learning_test' },
  production: { ...base }
};
