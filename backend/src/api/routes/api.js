/**
 * PLEASE ADD HERE HEADER COPY RIGHT...
 */

/**
 * @author Rafael Torres
 * @file api.js
 * @description Initialize API routes
 */

// Dependencies
const { Router } = require('restify-router');
var events_controller = require("../controllers/events");

// Dependency Injector
const {
  container: dependencyContainer
} = require('../../dependency_injection/dependencyInjection');


// Initialice params
const apiRouter = new Router();
const API = dependencyContainer.api;

/**
 * Call dummy service ..
 *
 * @type { GET }
 *
 * @param { Object } req - Content info about request
 * @param { Object } res - Data to send response
 *
 * @return Dummy test response
 */


apiRouter.post('/user', events_controller.readCreate);
apiRouter.get('/', events_controller.getAll);
apiRouter.post('/', events_controller.create);
apiRouter.get('/:id', events_controller.get);
apiRouter.put('/:id', events_controller.update);
apiRouter.del('/:id', events_controller.delete);

module.exports = apiRouter;
