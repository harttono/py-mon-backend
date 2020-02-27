'use strict';
module.exports = (sequelize, DataTypes) => {
  const payment = sequelize.define('payment', {
    no_rek: DataTypes.INTEGER,
    proof_of_payment: DataTypes.STRING,
    id_user: DataTypes.INTEGER,
    status: DataTypes.ENUM
  }, {});
  payment.associate = function(models) {
    payment.belongsTo(models.user, {
      foreignKey: "id_user",
      as: "user"
    });
  };
  return payment;
};