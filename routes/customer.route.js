"use strict";

const express = require("express");
// eslint-disable-next-line new-cap
const customer = express.Router();
const { Customer } = require("../models");
const { checkCustomer } = require("../middlewares/basic-auth");
const { signin, signup } = require("../controllers/customer.controller");
const serverError = require("../error-handlers/500");
const { customerAuth } = require("../middlewares/bearer-auth");

customer.post("/signup", checkCustomer, signup);
customer.post("/signin", signin);
customer.get("/customers", customerAuth, getAllCustomers);
// customer.post("/customer", createNewCustomer);

customer.get("/customer/:id", serverError, customerAuth, getCustomer);
customer.put("/customer/:id", customerAuth, updateCustomer);
customer.delete("/customer/:id", customerAuth, deleteCustomer);
customer.delete("/suscustomer/:id", customerAuth, suspendCustomer);
customer.get("/customer", (req, res) => {
  res.send("Hello Customer");
});


async function getAllCustomers(req, res) {
  try {
    let allCustomers = await Customer.getAll();
    res.status(200).json(allCustomers);
  } catch (error) {
    console.log(error);
    res.status(200).json({
      error: error
    });
  }
}

async function getCustomer(req, res) {
  try {
    let requestedCustomer = await Customer.getById(req.params.id);
    res.status(200).json(requestedCustomer);
  } catch (error) {
    console.log(error);
    res.status(200).json({
      error: error
    });
  }
}

async function updateCustomer(req, res) {
  try {
    let requestedCustomer = await Customer.update(req.params.id, req.body);
    res.status(200).json(requestedCustomer);
  } catch (error) {
    console.log(error);
    res.status(200).json({
      error: error
    });
  }
}

async function deleteCustomer(req, res) {
  try {
    let deletedCustomer = await Customer.hide(req.params.id);
    res.status(202).json(deletedCustomer);
  } catch (error) {
    console.log(error);
    res.status(200).json({
      error: error
    });
  }
}

async function suspendCustomer(req, res) {
  try {
    let suspendCustomer = await Customer.suspend(req.params.id);
    res.status(202).json(suspendCustomer);
  } catch (error) {
    console.log(error);
    res.status(200).json({
      error: error
    });
  }
}

module.exports = customer;

// create routes for: create customer, get all customers, get one customer,
// update customer info, suspend customer
