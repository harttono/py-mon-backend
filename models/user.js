'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user',{
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    role: DataTypes.STRING,
    admin: DataTypes.BOOLEAN,
    picture:DataTypes.STRING
  },{});
  user.associate = function(models) {
    user.hasMany(models.order, {
      foreignKey: 'id_user',
    })
  };
  return user;
};