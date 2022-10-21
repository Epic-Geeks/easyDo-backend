"use strict";

const express = require("express");
const { Order } = require("../models");
// eslint-disable-next-line new-cap
const orders = express.Router();
const serverError = require("../error-handlers/500");
const { ACL } = require("../middlewares/ACL");
const { userAuth, orderAuth } = require("../middlewares/bearer-auth")
orders.get("/orders", getAllOrders);
orders.post("/order", orderAuth, ACL, createNewOrder);

orders.get("/order/:id", serverError, getOrder);
orders.put("/orderStatus/:id/:condition", updateCondition);

orders.delete("/order/:id", deleteOrder);

async function createNewOrder(req, res) {
  try {
    const obj = req.body;
    let newOrder = await Order.create(obj);
    res.status(201).json(newOrder);
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: error,
    });
  }
}

async function getAllOrders(req, res) {
  try {
    let allOrders = await Order.getAll();
    res.status(200).json(allOrders);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
}

async function getOrder(req, res) {
  try {
    let requestedOrder = await Order.getById(req.params.id);
    res.status(200).json(requestedOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
}

async function updateCondition(req, res) {
  try {
    let requestedOrder = await Order.updateOrderStatus(
      req.params.id,
      req.params.condition
    );
    res.status(200).json(requestedOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
}

async function deleteOrder(req, res) {
  try {
    let deletedOrder = await Order.hide(req.params.id);
    res.status(202).json(deletedOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
}

module.exports = orders;
