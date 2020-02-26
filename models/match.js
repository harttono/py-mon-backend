'use strict';
module.exports = (sequelize, DataTypes) => {
  const match = sequelize.define('match', {
    id_pet: DataTypes.INTEGER,
    id_pet_liked: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN
  }, {});
  match.associate = function(models) {
    match.belongsTo(models.pet,{
      foreignKey:"id_pet",
      as:"Match"
    })

  };
  return match;
};