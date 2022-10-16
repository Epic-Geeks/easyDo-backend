"use strict";

/* istanbul ignore next */
module.exports = (sequelize, DataTypes) => {
  const Provider = sequelize.define("ProvidersRoles", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      isEmail: true,
    },
    suspend: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    visibility: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("provider"),
      defaultValue: "provider",
    },
    visibility: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
  return Provider;
};
