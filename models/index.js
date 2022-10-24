"use strict";

const { Sequelize, DataTypes } = require("sequelize");


const admin = require("./admin.model");
const service = require("./service.model");
const order = require("./orders.model");
const customer = require("./customer.model");
const provider = require("./provider.model.js");
const chat = require("./chat.model.js");

const Collection = require("../collections/collections");

const POSTGRES_URL =
  process.env.DATABASE_URL || "postgresql://ali:1312@localhost:5432/ali";


const sequelizeOption = {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};

const sequelize = new Sequelize(POSTGRES_URL, /* sequelizeOption */);

const adminModel = admin(sequelize, DataTypes);
const serviceModel = service(sequelize, DataTypes);
const orderModel = order(sequelize, DataTypes);
const customerModel = customer(sequelize, DataTypes);
const providerModel = provider(sequelize, DataTypes);
const chatModel = chat(sequelize, DataTypes);

providerModel.hasMany(serviceModel, {
  foreignKey: "providerID",
  sourceKey: "id",
});
serviceModel.belongsTo(providerModel, {
  foreignKey: "providerID",
  targetKey: "id",
});

providerModel.hasMany(orderModel, {
  foreignKey: "providerID",
  sourceKey: "id",
});
orderModel.belongsTo(providerModel, {
  foreignKey: "providerID",
  targetKey: "id",
});

customerModel.hasMany(orderModel, {
  foreignKey: "customerID",
  sourceKey: "id",
});
orderModel.belongsTo(customerModel, {
  foreignKey: "customerID",
  targetKey: "id",
});

serviceModel.hasMany(orderModel, { foreignKey: "serviceID", sourceKey: "id" });
orderModel.belongsTo(serviceModel, {
  foreignKey: "serviceID",
  targetKey: "id",
});

customerModel.hasMany(chatModel, { foreignKey: "customerID", sourceKey: "id" });
chatModel.belongsTo(customerModel, { foreignKey: "customerID", targetKey: "id" });

providerModel.hasMany(chatModel, { foreignKey: "providerID", sourceKey: "id" });
chatModel.belongsTo(providerModel, { foreignKey: "providerID", targetKey: "id" });

const orders = new Collection(orderModel);
const customers = new Collection(customerModel);
const services = new Collection(serviceModel);
const admins = new Collection(adminModel);
const providers = new Collection(providerModel);

module.exports = {
  db: sequelize,
  Provider: providers,
  Customer: customers,
  customerModel: customerModel,
  Order: orders,
  orderModel: orderModel,
  Service: services,
  Admin: admins,
  providerModel: providerModel,
  serviceModel: serviceModel,
  adminModel: adminModel,
  chatModel: chatModel,
};
