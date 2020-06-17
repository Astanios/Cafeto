/**
 * PLEASE ADD HERE HEADER COPY RIGHT...
 */

/**
 * @author Rafael Torres
 * @file test.model.js
 * @description Test Persistence Model
 */

module.exports = (sequelize, DataTypes) => {
  const Test = sequelize.define('test', {
    name: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, { freezeTableName: true });

  return Test;
};
