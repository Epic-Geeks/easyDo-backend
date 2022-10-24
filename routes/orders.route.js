"use strict";

const express = require("express");
// eslint-disable-next-line new-cap
const orders = express.Router();
const serverError = require("../error-handlers/500");
const { ACL } = require("../middlewares/ACL");
const { orderAuth } = require("../middlewares/bearer-auth");
const { sendEmail } = require("../middlewares/handlebars");
const {
  getAllOrders,
  checkDate,
  createNewOrder,
  getOrder,
  updateCondition,
  deleteOrder,
} = require("../controllers/order.controller");

orders.get("/orders", getAllOrders);
orders.post("/order", orderAuth, ACL, checkDate, createNewOrder, sendEmail);

orders.get("/order/:id", serverError, getOrder);
orders.put("/orderStatus/:id/:condition", updateCondition);

orders.delete("/order/:id", deleteOrder);

module.exports = orders;
