"use strict";
module.exports = (sequelize, DataTypes) => {
  const collection = sequelize.define(
    "collection",
    {
      id_pocemon: DataTypes.INTEGER,
      id_user: DataTypes.INTEGER,
      catched: DataTypes.STRING,
    },
    {}
  );
  collection.associate = function (models) {
    collection.belongsTo(models.pocemon, {
      foreignKey: "id_pocemon",
    });
    collection.belongsTo(models.user, {
      foreignKey: "id_user",
    });
  };
  return collection;
};
