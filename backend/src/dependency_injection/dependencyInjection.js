/**
 * PLEASE ADD HERE HEADER COPY RIGHT...
 */

/**
 * @author Rafael Torres
 * @file dependencyInjection.js
 * @description Prepare dependencies injection
 */

// Dependencies
const Bottle = require('bottlejs');

// Models
const models = require('../data_model');

// Persistences
const TestPersistence = require('../services_models/persistences/test.persistence');

// Services
const TestService = require('../services_models/services/test.service');

// Inject dependencies
const bottle = new Bottle();

bottle.factory('TestPersistence', () => new TestPersistence(models));
bottle.service('TestService', TestService, 'TestPersistence');


bottle.factory('api', container => container);

module.exports = bottle;
