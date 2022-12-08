"use strict";
const { Customer, orderModel } = require("../models");

const errorObj = (error) => {
  return {
    message: error,
    status: 500,
  };
};
async function getCustomer(req, res) {
  try {
    let requestedCustomer = await Customer.getCustomerById(
      req.params.id,
      orderModel
    );
    res.status(200).json(requestedCustomer);
  } catch (error) {
    console.log(error);
    next(errorObj(error));
  }
}

async function updateCustomer(req, res, next) {
  try {
    if (req.files && req.files.length > 0) {
      req.body.picture = req.files.map(
        (file) => `${process.env.BACKEND_URL}/${file.filename}`
      );
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

module.exports = {
  getCustomer,
  updateCustomer,
  deleteCustomer,
};
