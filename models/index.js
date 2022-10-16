"use strict";

const { Sequelize, DataTypes } = require("sequelize");

const service = require("./service.model");
const order = require("./orders.model");
const customer = require("./customer.model");
const provider = require("./provider.model.js");
const OrdersCollection = require("../collections/ordersCollection");

const CustomerCollection = require("../collections/customerCollection");

const ServicesCollection = require("../collections/servicesCollection");

const ProviderCollection = require("../collections/providerCollection");

const POSTGRES_URL =
  process.env.DATABASE_URL ||
  "postgresql://postgres:1312@localhost:5432/postgres";

const sequelize = new Sequelize(POSTGRES_URL);

const serviceModel = service(sequelize, DataTypes);
const orderModel = order(sequelize, DataTypes);
const customerModel = customer(sequelize, DataTypes);
const providerModel = provider(sequelize, DataTypes);


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

const orders =  new OrdersCollection(orderModel);

const customers = new CustomerCollection(customerModel);

const services = new ServicesCollection(serviceModel);

const providers = new ProviderCollection(providerModel);

module.exports = {
  db: sequelize,
  Provider: providers,
  Customer: customers,
  Order: orders,
  Service: services,
  ProviderModel: providerModel,
  ServiceModel: serviceModel
};
