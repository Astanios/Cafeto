/**
 * PLEASE ADD HERE HEADER COPY RIGHT...
 */

/**
 * @author Rafael Torres
 * @file app.js
 * @description Initialize app server
 */

// Dependencies
const restify = require('restify');
require('dotenv').config();

// Middleware
const jwt = require('./api/middlewares/jwt');
const cors = require('./api/middlewares/cors');
const apiRouter = require('./api/routes/api');

// Create server
const server = restify.createServer();
const port = process.env.SERVER_PORT || 3000;

// Middlewares
server.pre(cors.preflight);
server.use(cors.actual);
server.use(jwt.JWT);
server.use(jwt.JWTErrorHandle);

// Plugings
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

// Configure API
apiRouter.applyRoutes(server);

server.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Server is now running on port ${port}`);
  /* eslint-enable no-console */
});
