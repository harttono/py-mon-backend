'use strict';
module.exports = (sequelize, DataTypes) => {
  const species = sequelize.define('species', {
    name: DataTypes.STRING
  }, {});
  species.associate = function(models) {
    // species.hasOne(models.pet, {
    //   foreignKey: "id_species",
    //   as: "id_species"
    // });
  };
  return species;
};