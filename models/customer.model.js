"use strict";

const jwt = require("jsonwebtoken");

/* istanbul ignore next */
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define("CustomersRoles", {
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
      defaultValue: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("customer"),
      defaultValue: "customer",
    },
    visibility: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  return Customer;
};

