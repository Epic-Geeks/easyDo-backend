"use strict";

/* istanbul ignore next */
module.exports = (sequelize, DataTypes) => {
 const Admin = sequelize.define("AdminRoles", {
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
  password: {
   type: DataTypes.STRING,
   allowNull: false,
  },
  AdminID: {
   type: DataTypes.INTEGER,
   allowNull: false,
  },
  role: {
   type: DataTypes.ENUM("admin"),
   defaultValue: "admin",
  },
 });
 return Admin;
};
