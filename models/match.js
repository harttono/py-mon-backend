'use strict';
module.exports = (sequelize, DataTypes) => {
  const match = sequelize.define('match', {
    id_pet: DataTypes.INTEGER,
    id_pet_liked: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  match.associate = function(models) {
    match.belongsTo(models.pet,{
    foreignKey:"id_pet",
    as:"Match"
    });
    match.belongsTo(models.pet, {
    foreignKey: "id_pet_liked",
    as: "Mliked"
    });

  };
  return match;
};