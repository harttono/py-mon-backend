'use strict';
module.exports = (sequelize, DataTypes) => {
  const pet = sequelize.define('pet', {
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    id_species: DataTypes.INTEGER,
    id_age: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    about: DataTypes.STRING
  }, {});
  pet.associate = function(models) {
    pet.belongsTo(models.species,{
      foreignKey: "id_species",
    });
    pet.belongsTo(models.age,{
      foreignKey: "id_age",
    });
    pet.belongsTo(models.user,{
      foreignKey: "id_user",
    });
  };
  return pet;
};