"use strict";

module.exports = (sequelize, DataTypes) => {

  const order = sequelize.define("Order", {
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
      type: DataTypes.ENUM("pending", "approved", "inProgress", "done"),
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
    rateService: {
      type: DataTypes.DOUBLE,
      defaultValue: 4.0
    },
    orderDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reviewComment: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // orderLocation: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
  });
  return order;
};
