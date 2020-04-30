'use strict';
module.exports = (sequelize, DataTypes) => {
  const payment = sequelize.define('payment', {
    id_ticket: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER,
    status: DataTypes.STRING,
    attachment: DataTypes.STRING
  }, {});
  payment.associate = function(models) {
     payment.belongsTo(models.ticket, {
       foreignKey: "id_ticket"
     });
    payment.belongsTo(models.user, {
       foreignKey: "id_user"
     });
  };
  return payment;
};