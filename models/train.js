'use strict';
module.exports = (sequelize, DataTypes) => {
  const train = sequelize.define('train', {
    name: DataTypes.STRING
  },{});
  train.associate = function(models) {

  };
  return train;
};