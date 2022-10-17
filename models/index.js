"use strict";

const { Sequelize, DataTypes } = require("sequelize");


const admin = require("./admin.model");
const service = require("./service.model");
const order = require("./orders.model");
const customer = require("./customer.model");
const provider = require("./provider.model.js");

const ServicesCollection = require("../collections/servicesCollection");

const ProviderCollection = require("../collections/providerCollection");

const Collection = require("../collections/collections");

const POSTGRES_URL =
  process.env.DATABASE_URL || "postgresql://malek:1312@localhost:5432/postgres";

const sequelize = new Sequelize(POSTGRES_URL);

const adminModel = admin(sequelize, DataTypes);
const serviceModel = service(sequelize, DataTypes);
const orderModel = order(sequelize, DataTypes);
const customerModel = customer(sequelize, DataTypes);
const providerModel = provider(sequelize, DataTypes);

adminModel.hasMany(serviceModel, { foreignKey: "AdminID", sourceKey: "id" });
serviceModel.belongsTo(adminModel, { foreignKey: "AdminID", targetKey: "id" });

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

const orders = new Collection(orderModel);
const customers = new Collection(customerModel);
const services = new ServicesCollection(serviceModel);
const admins = new Collection(adminModel);
const providers = new ProviderCollection(providerModel);

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
  adminModel: adminModel
};
