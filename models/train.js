'use strict';
module.exports = (sequelize, DataTypes) => {
  const train = sequelize.define('train', {
    name: DataTypes.STRING
  }, {});
<<<<<<< HEAD:models/species.js
  species.associate = function(models) {
    species.belongsTo(models.pet, {
      foreignKey: "id_species",
      as: "species"
    });
=======
  train.associate = function(models) {
    // associations can be defined here
>>>>>>> backup:models/train.js
  };
  return train;
};