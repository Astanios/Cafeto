/**
 * PLEASE ADD HERE HEADER COPY RIGHT...
 */

/**
 * @author Rafael Torres
 * @file test.persistence.js
 * @description Test Persistence Unit Test
 */

// Dependencies
const chai = require('chai');
const sinon = require('sinon');

// Persistences
const TestPersistence = require('../../src/services_models/persistences/test.persistence');

// Fixtures
const testFixtures = require('../fixtures/test.fixture');

// Get exoected  function
const { expect } = chai;

describe('Test Service', () => {
  let sandbox;
  let testPersistence;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    testPersistence = new TestPersistence({ Test: testFixtures });
  });

  afterEach(() => {
    sandbox.restore();
  });

  context('Test test', () => {
    it('should execute persistence test', async () => {
      const expected = testFixtures.all;

      // Generate  Mocks
      const result = await testPersistence.test();

      expect(expected).to.equal(result);
    });
  });
});
