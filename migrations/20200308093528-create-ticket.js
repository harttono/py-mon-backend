'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      type_train: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "trains",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      age: {
        type: Sequelize.ENUM(['Child','Teenager','Adult']),
        allowNull: false
      },
      start_date: {
        type: Sequelize.STRING
      },
      start_station: {
        type: Sequelize.STRING
      },
      start_time: {
        type: Sequelize.STRING
      },
      destination: {
        type: Sequelize.STRING
      },
      arrival_time: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      qty: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tickets');
  }
};