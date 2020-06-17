/**
 * PLEASE ADD HERE HEADER COPY RIGHT...
 */

/**
 * @author Rafael Torres
 * @file test.service.js
 * @description Test Service Unit Test
 */

// Dependencies
const chai = require('chai');
const sinon = require('sinon');

// Services
const TestService = require('../../src/services_models/services/test.service');

// Persistences
const TestPersistence = require('../../src/services_models/persistences/test.persistence');

// Get exoected  function
const { expect } = chai;

describe('Test Service', () => {
  const persistence = new TestPersistence({});

  let sandbox;
  let testInstance;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    testInstance = new TestService(persistence);
  });

  afterEach(() => {
    sandbox.restore();
  });

  context('Test test', () => {
    it('should execute service test', async () => {
      const expected = 'Hello';

      // Generate  Mocks
      const testMock = sandbox.mock(persistence);
      testMock
        .expects('test')
        .returns(expected);

      const result = await testInstance.test();

      expect(expected).to.equal(result);
      testMock.verify();
    });
  });
});
