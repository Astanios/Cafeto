'use strict'

var mysql = require('mysql');

module.exports = {
    name: 'cafeto',
    hostname: 'http://localhost',
    version: '0.0.1',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    db: {
        get: mysql.createConnection({
            host: 'localhost',
            user: 'cafeto',
            password: 'coffee4life',
            database: 'cafeto'
        })
    }
}