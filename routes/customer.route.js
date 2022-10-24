"use strict";

const express = require("express");
// eslint-disable-next-line new-cap
const customer = express.Router();
const { Customer, orderModel } = require("../models");
const { checkSignup } = require("../middlewares/basic-auth");
const { signin, signup } = require("../controllers/controller");
const serverError = require("../error-handlers/500");
const { userAuth } = require("../middlewares/bearer-auth");
const { imgUpload } = require("../upload/imagesUplaod");
const { ACL } = require("../middlewares/ACL");

customer.post("/customer/signup", imgUpload.array("picture", 1), checkSignup, signup);
customer.post("/customer/signin", signin);

customer.get("/customer/:id", serverError, userAuth, getCustomer);

customer.put("/customer/:id", imgUpload.array("picture", 1), userAuth, ACL, updateCustomer);

customer.delete("/customer/:id", userAuth, ACL, deleteCustomer);
const errorObj = (error) => {
  return {
    message: error,
    status: 500
  }
};
async function getCustomer(req, res) {
  try {
    let requestedCustomer = await Customer.getCustomerById(req.params.id, orderModel);
    res.status(200).json(requestedCustomer);
  } catch (error) {
    console.log(error);
    next(errorObj(error));
  }
}

async function updateCustomer(req, res) {
  try {
    if (req.files && req.files.length > 0) {
      req.body.picture = req.files.map((file) => `${process.env.BACKEND_URL}/${file.filename}`);
    }
    let requestedCustomer = await Customer.updateUser(req.params.id, req.body);
    res.status(200).json(requestedCustomer);
  } catch (error) {
    console.log(error);
    next(errorObj);
  }
}

async function deleteCustomer(req, res) {
  try {
    let deletedCustomer = await Customer.hide(req.params.id);
    res.status(204).json(deletedCustomer);
  } catch (error) {
    console.log(error);
    next(errorObj);
  }
}


module.exports = customer;

// create routes for: create customer, get all customers, get one customer,
// update customer info, suspend customer
