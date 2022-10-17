"use strict";

const { Sequelize, DataTypes } = require("sequelize");

const admin = require("./admin.model");
const service = require("./service.model");
const order = require("./orders.model");
const customer = require("./customer.model");
const provider = require("./provider.model.js");

const AdminCollection = require("../collections/adminCollection");

const OrdersCollection = require("../collections/ordersCollection");

const CustomerCollection = require("../collections/customerCollection");

const ServicesCollection = require("../collections/servicesCollection");

const ProviderCollection = require("../collections/providerCollection");

const POSTGRES_URL =
  process.env.DATABASE_URL ||
  "postgresql://malek:1312@localhost:5432/postgres";

const sequelize = new Sequelize(POSTGRES_URL);

const adminModel = admin(sequelize, DataTypes);
const serviceModel = service(sequelize, DataTypes);
const orderModel = order(sequelize, DataTypes);
const customerModel = customer(sequelize, DataTypes);
const providerModel = provider(sequelize, DataTypes);

// adminModel.hasMany(orderModel, { foreignKey: "AdminID",sourceKey: "id", });
// orderModel.belongsTo(adminModel, { foreignKey: "AdminID",targetKey: "id", });

// adminModel.hasMany(serviceModel, { foreignKey: "AdminID",sourceKey: "id", });
// serviceModel.belongsTo(adminModel, { foreignKey: "AdminID",targetKey: "id", });


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

const orders = new OrdersCollection(orderModel);
const customers = new CustomerCollection(customerModel);
const services = new ServicesCollection(serviceModel);
const admins = new AdminCollection(adminModel);
const providers = new ProviderCollection(providerModel);

module.exports = {
  db: sequelize,
  Provider: providers,
  Customer: customers,
  customerModel: customerModel,
  Order: orders,
  Service: services,
  Admin: admins,
  ProviderModel: providerModel,
  ServiceModel: serviceModel,
  AdminModel: adminModel
};
