"use strict";

module.exports = (sequelize, DataTypes) => {

  const order = sequelize.define("OrdersTest", {
    orderNotes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    visibility: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    status: {
      // eslint-disable-next-line new-cap
      type: DataTypes.ENUM("pending", "inProgress", "done"),
      defaultValue: "pending"
    },
    customerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    providerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    serviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rate: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    rateService: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 4.0
    },
    rateProvider: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 4.0
    }
  });
  return order;
};
