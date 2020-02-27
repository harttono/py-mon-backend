'use strict';
module.exports = (sequelize, DataTypes) => {
  const pet = sequelize.define('pet', {
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    id_species: DataTypes.INTEGER,
    age: DataTypes.STRING,
    id_user: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    about: DataTypes.STRING
  }, {});
  pet.associate = function(models) {
    // associations can be defined here
    pet.belongsTo(models.species, {
     foreignKey: "id_species",
     as:"species"
       });
    pet.belongsTo(models.user,{
      foreignKey: "id_user",
      as:"user"
    });
    
  };
  return pet;
};