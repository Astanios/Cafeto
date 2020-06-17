/**
 * PLEASE ADD HERE HEADER COPY RIGHT...
 */

/**
 * @author Rafael Torres
 * @file test.service.js
 * @description Service for dummy test
 */

class TestService {
  /**
   * Initialize test service
   *
   * @param { TestPersistence } - Inject TestPersistence
   */
  constructor(TestPersistence) {
    this._TestPersistence = TestPersistence;
  }

  /**
   * Execute dummy service
   */
  async test() {
    return this._TestPersistence.test();
  }
}

module.exports = TestService;
