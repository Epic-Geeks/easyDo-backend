"use strict";

const express = require("express");
// eslint-disable-next-line new-cap
const customer = express.Router();
const { checkSignup } = require("../middlewares/basic-auth");
const { signin, signup } = require("../controllers/controller");
const serverError = require("../error-handlers/500");
const { userAuth } = require("../middlewares/bearer-auth");
const { imgUpload } = require("../upload/imagesUplaod");
const { ACL } = require("../middlewares/ACL");
const {
  getCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customer.controller");

customer.post(
  "/customer/signup",
  imgUpload.array("picture", 1),
  checkSignup,
  signup
);

customer.get("/customer/:id", serverError, userAuth, getCustomer);

customer.put(
  "/customer/:id",
  imgUpload.array("picture", 1),
  userAuth,
  ACL,
  updateCustomer
);

customer.delete("/customer/:id", userAuth, ACL, deleteCustomer);

(module.exports = customer), { getCustomer };

// create routes for: create customer, get all customers, get one customer,
// update customer info, suspend customer
