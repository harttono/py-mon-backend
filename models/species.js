'use strict';
module.exports = (sequelize, DataTypes) => {
  const species = sequelize.define('species', {
    name: DataTypes.STRING
  }, {});
  species.associate = function(models) {
    species.belongsTo(models.pet, {
      foreignKey: "id_species",
      as: "species"
    });
  };
  return species;
};