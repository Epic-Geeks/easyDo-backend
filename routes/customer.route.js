"use strict";

const express = require("express");
// eslint-disable-next-line new-cap
const customer = express.Router();
const { Customer, orderModel } = require("../models");
const { checkSignup } = require("../middlewares/basic-auth");
const { signin, signup } = require("../controllers/controller");
const serverError = require("../error-handlers/500");
const { userAuth } = require("../middlewares/bearer-auth");
const { uploadCustomer } = require("../upload/customerPic");

customer.post("/customer/signup", uploadCustomer.array("customerPic", 1) ,checkSignup, signup);
customer.post("/customer/signin", signin);

customer.get("/customer/:id", serverError, userAuth, getCustomer);

customer.put("/customer/:id", uploadCustomer.array("customerPic", 1), userAuth, updateCustomer);

customer.delete("/customer/:id", userAuth, deleteCustomer);

async function getCustomer(req, res) {
  try {
    let requestedCustomer = await Customer.getCustomerById(req.params.id, orderModel);
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
    if ( req.files && req.files.length > 0 ) {
      req.body.customerPic = req.files.map((file) => `${process.env.BACKEND_URL}/${file.filename}`);
    }
    let requestedCustomer = await Customer.updateUser(req.params.id, req.body);
    res.status(200).json(requestedCustomer);
  } catch (error) {
    console.log(error);
    res.status(401).json({
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


module.exports = customer;

// create routes for: create customer, get all customers, get one customer,
// update customer info, suspend customer
