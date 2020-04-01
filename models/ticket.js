'use strict';
module.exports = (sequelize, DataTypes) => {
  const ticket = sequelize.define('ticket', {
    name: DataTypes.STRING,
    type_train: DataTypes.INTEGER,
    start_date: DataTypes.STRING,
    start_station: DataTypes.STRING,
    start_time: DataTypes.STRING,
    destination: DataTypes.STRING,
    arrival_time: DataTypes.STRING,
    price: DataTypes.INTEGER,
    qty: DataTypes.INTEGER
  }, {});
  ticket.associate = function(models) {
    ticket.belongsTo(models.train, {
       foreignKey: "type_train"
     });
  };
  return ticket;
};