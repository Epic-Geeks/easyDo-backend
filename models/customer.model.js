"use strict";

const jwt = require("jsonwebtoken");

/* istanbul ignore next */
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define("Customer", {
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
    customerAddress: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    suspend: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
      type: DataTypes.ENUM("customer"),
      defaultValue: "customer",
    },
    visibility: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    phoneNumber:{
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Customer.authenticateToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return err;
      } else {
        return decoded;
      }
    });
  };

  return Customer;
};
