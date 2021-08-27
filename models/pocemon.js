"use strict";
module.exports = (sequelize, DataTypes) => {
  const pocemon = sequelize.define(
    "pocemon",
    {
      name: DataTypes.STRING,
      species_id: DataTypes.INTEGER,
      height: DataTypes.INTEGER,
      weight: DataTypes.INTEGER,
      ability: DataTypes.STRING,
      catched: DataTypes.STRING,
      exchange: DataTypes.STRING,
    },
    {}
  );
  pocemon.associate = function (models) {
    pocemon.hasOne(models.category, {
      foreignKey: "species_id",
    });
  };
  return pocemon;
};
