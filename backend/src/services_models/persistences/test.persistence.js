/**
 * PLEASE ADD HERE HEADER COPY RIGHT...
 */

/**
 * @author Rafael Torres
 * @file test.persistence.js
 * @description Persistence to test model
 */

class TestPersistence {
  /**
   * Initialize Test persistence
   *
   * @param { object } models - Models to ORM
   */
  constructor({ Test }) {
    this._Test = Test;
  }

  /**
   * Run dummy service from persistence
   */
  test() {
    return this._Test.findAll();
  }
}

module.exports = TestPersistence;
