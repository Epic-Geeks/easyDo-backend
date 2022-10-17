"use strict";

module.exports = (sequelize, DataTypes) => {
 const order = sequelize.define("OrdersTest", {
  orderNotes: {
   type: DataTypes.STRING,
   allowNull: false,
  },
  visibility: {
   type: DataTypes.BOOLEAN,
   defaultValue: true,
  },
  status: {
   type: DataTypes.ENUM("received", "inProgress", "done"),
   defaultValue: "received",
  },
  // customerID: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  // },
  // providerID: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  // },
  // serviceID: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  // },
 });
 return order;
};
