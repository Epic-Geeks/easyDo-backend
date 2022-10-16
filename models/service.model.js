"use strict";

module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define("Services", {
    serviceDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serviceCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    visibility: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    provisibilityviderID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Service;
};
