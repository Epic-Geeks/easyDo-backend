"use strict";

const express = require("express");
const { Order } = require("../models");
// eslint-disable-next-line new-cap
const orders = express.Router();
const serverError = require("../error-handlers/500");

orders.get("/orders", getAllOrders);
orders.post("/order", createNewOrder);

orders.get("/order/:id", serverError, getOrder);
orders.put("/orderStatus/:id/:condition", updateCondition);

orders.delete("/order/:id", deleteOrder);

async function createNewOrder(req, res) {
 console.log("createNewOrder");
 const obj = req.body;
 let newOrder = await Order.createOrder(obj);
 res.status(201).json(newOrder);
}

async function getAllOrders(req, res) {
 let allOrders = await Order.getAllOrders();
 res.status(200).json(allOrders);
}

async function getOrder(req, res) {
 let requestedOrder = await Order.getOrder(req.params.id);
 res.status(200).json(requestedOrder);
}

async function updateCondition(req, res) {
 let requestedOrder = await Order.updateOrderCon(
  req.params.id,
  req.params.condition
 );
 res.status(200).json(requestedOrder);
}

async function deleteOrder(req, res) {
 let deletedOrder = await Order.hideOrder(req.params.id);
 res.status(202).json(deletedOrder);
}

console.log("orders.route.js");
module.exports = orders;
