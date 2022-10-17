"use strict";

const jwt = require("jsonwebtoken");

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
   defaultValue: false,
  },
  visibility: {
   type: DataTypes.BOOLEAN,
   defaultValue: true,
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
