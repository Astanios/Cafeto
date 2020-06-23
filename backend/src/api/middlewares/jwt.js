/**
 * PLEASE ADD HERE HEADER COPY RIGHT...
 */

/**
 * @author Rafael Torres
 * @file jwt.js
 * @description Middleware to JWT
 */

// Dependencies
const jwt = require('restify-jwt-community');
const jwksRsa = require('jwks-rsa');
// configure JWT to validate credential before execute request
exports.JWT = jwt({
  //secret: process.env.SECRET_KEY, ///original way
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://cafetest.us.auth0.com/.well-known/jwks.json`
  }),
  credentialsRequired: true,
  getToken: (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    }

    if (req.query && req.query.token) {
      return req.query.token;
    }

    return null;
  }
})
  .unless({ path: ['/api/user/info'] });

exports.JWTErrorHandle = (err, req, res, next) => {
  switch (err.name) {
    case 'UnauthorizedError':
    case 'InvalidCredentialsError':
      res.send(401, 'Missing authorization token');
      break;
    default:
      next();
  }
};
