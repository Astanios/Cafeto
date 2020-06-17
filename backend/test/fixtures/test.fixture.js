/**
 * PLEASE ADD HERE HEADER COPY RIGHT...
 */

/**
 * @author Rafael Torres
 * @file test.persistence.js
 * @description Test Fixtures Unit Test
 */

const tests = [
  {
    id: 1,
    name: 'Alexander'
  },
  {
    id: 2,
    name: 'Jeffry'
  },
  {
    id: 3,
    name: 'Rafael'
  }
];

module.exports = {
  all: tests,
  findAll: () => tests
};
