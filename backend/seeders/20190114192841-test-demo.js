/**
 * PLEASE ADD HERE HEADER COPY RIGHT...
 */

const test = (queryInterface, Sequelize) => (
  queryInterface.createTable('test', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE
    }
  })
);

const testValues = queryInterface => queryInterface.bulkInsert('test', [
  {
    name: 'Alexander',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Rafael',
    created_at: new Date(),
    updated_at: new Date()
  }
]);

module.exports = {
  up: (queryInterface, Sequelize) => Promise.resolve()
    .then(() => test(queryInterface, Sequelize))
    .then(() => testValues(queryInterface)),

  down: () => {}
};
