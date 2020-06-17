/**
 * PLEASE ADD HERE HEADER COPY RIGHT...
 */

/**
 * @author Rafael Torres
 * @file cors.js
 * @description Middleware to CORS
 */

// Dependencies
const corsMiddleware = require('restify-cors-middleware');

const cors = corsMiddleware({
  origins: ['*'],
  allowHeaders: ['authorization']
});

module.exports = cors;
