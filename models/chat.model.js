"use strict";

module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define("Chat", {
    ChatMessages: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
      allowNull: true,
    },
    providerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    customerID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        },
  });
  return Service;
};
