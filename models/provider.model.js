"use strict";

const jwt = require("jsonwebtoken");

/* istanbul ignore next */
module.exports = (sequelize, DataTypes) => {

  const Provider = sequelize.define("Provider", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      isEmail: true,
    },
    picture: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    providerCoveredCities: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    // five orders per day:
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
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign(
          {
            username: this.username,
          },
          process.env.JWT_SECRET
        );
      },
      set(tokenObj) {
        return jwt.sign(tokenObj, process.env.JWT_SECRET);
      },
    },
    role: {
      // eslint-disable-next-line new-cap
      type: DataTypes.ENUM("provider"),
      defaultValue: "provider",
    },

  });

  Provider.authenticateToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return err;
      } else {
        return decoded;
      }
    });
  };

  return Provider;
};
