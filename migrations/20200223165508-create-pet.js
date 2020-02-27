'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("pets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.ENUM(['Female', 'Male'])
      },
      id_species: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "species",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      age: {
        type: Sequelize.ENUM(["Child","Teenager","Adult"]),
        allowNull: false,
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      photo: {
        type: Sequelize.STRING
      },
      about: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('pets');
  }
};