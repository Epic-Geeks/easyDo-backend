"use strict";

class OrdersCollection {
 constructor(model) {
  this.model = model;
 }
 // CRUD methods for the collection go here
 check(req, res, next) {
  console.log("OrdersCollection.check");
  next();
 }

 createOrder(obj) {
  try {
   return this.model.create(obj);
  } catch (e) {
   console.log("Error creating new order", e.message);
  }
 }

 getAllOrders() {
  try {
   const allOrders = this.model.findAll({ where: { visibility: true } });
   return allOrders;
  } catch (e) {
   console.log("Error while getting orders", e.message);
   return "Error while getting orders";
  }
 }

 getOrder(id) {
  try {
   return this.model.findOne({ where: { id } });
  } catch (e) {
   console.log("Error getting order", e.message);
  }
 }

 async updateOrderCon(id, status) {
  try {
   let targetedOrder = await this.model.findOne({ where: { id } });
   return await targetedOrder.update({ status: status });
  } catch (e) {
   console.log(e);
  }
 }

 async hideOrder(id) {
  try {
   let targetedOrder = await this.model.findOne({ where: { id } });
   return await targetedOrder.update({ visibility: false });
  } catch (e) {
   console.log(e);
  }
 }
}

module.exports = OrdersCollection;
