"use strict";
const jwt = require("jsonwebtoken");
/* istanbul ignore next */
module.exports = (sequelize, DataTypes) => {

  const Admin = sequelize.define("Admin", {
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
    name: {
      type: DataTypes.STRING,
      defaultValue: "Admin",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    visibility: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    suspend: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    role: {
      // eslint-disable-next-line new-cap
      type: DataTypes.ENUM("admin"),
      defaultValue: "admin",
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
  });
  Admin.authenticateToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return err;
      } else {
        return decoded;
      }
    });
  };
  return Admin;
};
