/**
 * PLEASE ADD HERE HEADER COPY RIGHT...
 */

// Dependencies
require('dotenv').config();

/**
 * @author Rafael Torres
 * @file config.js
 * @description Prepare configuration migrations
 */

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_HOST,
  DB_DIALECT
} = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    dialect: DB_DIALECT,
    seederStorage: 'sequelize',
    seederStorageTableName: 'SequelizeMeta'
  },
  staging: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    dialect: DB_DIALECT,
    seederStorage: 'sequelize',
    seederStorageTableName: 'SequelizeMeta'
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    dialect: DB_DIALECT,
    seederStorage: 'sequelize',
    seederStorageTableName: 'SequelizeMeta'
  }
};
