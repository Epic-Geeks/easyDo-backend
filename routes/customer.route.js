"use strict";

const express = require("express");
// eslint-disable-next-line new-cap
const customer = express.Router();

customer.get("/customer", (req, res) => {
  res.send("Hello Customer");
});

console.log("customer.route.js");
module.exports = customer;

// create routes for: create customer, get all customers, get one customer,
// update customer info, suspend customer
