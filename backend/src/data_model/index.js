/**
 * PLEASE ADD HERE HEADER COPY RIGHT...
 */

/**
 * @author Rafael Torres
 * @file index.js
 * @description Initialize ORM
 */

// Dependencies
const Sequelize = require('sequelize');

// Get database variables
const {
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_POOL_MAX,
  DB_POOL_MIN,
  DB_POOL_IDLE,
  DB_POOL_ACQUIRE,
  DB_DIALECT
} = process.env;

// Initialize sequalize
const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  pool: {
    max: DB_POOL_MAX,
    min: DB_POOL_MIN,
    idle: DB_POOL_IDLE,
    acquire: DB_POOL_ACQUIRE
  },
  dialect: DB_DIALECT,
  define: {
    underscored: true,
    deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
  },
  operatorsAliases: false
});

// Merge all Models
const models = {};
models.Events = sequelize.import('./events');
models.User = sequelize.import('./user');

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

module.exports = models;
