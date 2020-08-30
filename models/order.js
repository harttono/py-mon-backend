'use strict';
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('order',{
    id_ticket: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER,
    status: DataTypes.STRING,
    attachment: DataTypes.STRING
  }, {});
  order.associate = function(models){
    order.belongsTo(models.ticket,{
      foreignKey: "id_ticket"
    });
    order.belongsTo(models.user,{
      foreignKey: "id_user"
    });
  };
  return order;
};