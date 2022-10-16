"use strict";

const express = require("express");
// eslint-disable-next-line new-cap
const customer = express.Router();
const { Customer } = require("../models");
const { saveCustomer } = require("../middlewares/basic-auth");
const { signin, signup } = require("../controllers/customer.controller"); 


customer.post("/signup", saveCustomer, signup);
customer.post("/signin", signin); 
customer.get("/customers", getAllCustomers);
customer.post("/customer", createNewCustomer);
customer.get("/customer/:id", getCustomer);
customer.put("/customer/:id", updateCustomer);
customer.delete("/customer/:id", deleteCustomer);

customer.get("/customer", (req, res) => {
  res.send("Hello Customer");
});

async function createNewCustomer(req, res) {
  const obj = req.body;
  let newCustomer = await Customer.createCustomer(obj);
  res.status(201).json(newCustomer);
}

async function getAllCustomers(req, res) {
  let allCustomers = await Customer.getAllCustomers();
  res.status(200).json(allCustomers);
}

async function getCustomer(req, res) {
  let requestedCustomer = await Customer.getCustomer(req.params.id);
  res.status(200).json(requestedCustomer);
}

async function updateCustomer(req, res) {
  let requestedCustomer = await Customer.updateCustomer(req.params.id, req.body);
  res.status(200).json(requestedCustomer);
}

async function deleteCustomer(req, res) {
  let deletedCustomer = await Customer.hideCustomer(req.params.id);
  res.status(202).json(deletedCustomer);
}




console.log("customer.route.js");

module.exports = customer;



// create routes for: create customer, get all customers, get one customer,
// update customer info, suspend customer

