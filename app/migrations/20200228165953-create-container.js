'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Containers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      volume_limit: {
        type: Sequelize.INTEGER
      },
      weight_limit: {
        type: Sequelize.INTEGER
      },
      volume_filled: {
        type: Sequelize.INTEGER
      },
      weight_filled: {
        type: Sequelize.INTEGER
      },
      shipment_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Containers');
  }
};