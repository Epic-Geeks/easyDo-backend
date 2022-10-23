"use strict";

module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define("Services", {
    serviceDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price : {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    picture: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    serviceCategory: {
      type: DataTypes.ENUM("plumber", "electrician", "carpenter", "painter", "online"),
      allowNull: false,
    },
    visibility: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    averageRate: {
      type: DataTypes.DOUBLE,
      defaultValue: 0.0,
    },
    providerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Service;
};
