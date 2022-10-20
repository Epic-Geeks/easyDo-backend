"use strict";

const { Admin, Customer, Provider, serviceModel } = require("../models/index.js");
const express = require("express");
// eslint-disable-next-line new-cap
const admin = express.Router();
const { checkSignup } = require("../middlewares/basic-auth");
const { signup, signin } = require("../controllers/controller.js");
const { userAuth } = require("../middlewares/bearer-auth");
admin.get("/admin", (req, res) => {
  res.send("Hello Admin");
});

admin.post("/admin/signup", checkSignup, signup);
admin.post("/admin/signin", signin);

admin.get("/admin", userAuth, getAllAdmins);
admin.get("/admin/:id", userAuth, getAdminById);

admin.put("/admin/:id", userAuth, updateAdmin);

admin.delete("/admin/:id", userAuth, deleteAdmin);
admin.delete("/suspendAdmin/:id", userAuth, suspendAdmin);

// provider control routes
admin.get("/customer",  userAuth, getAllCustomers);
admin.delete("/susCustomer/:id", userAuth, suspendCustomer);

// provider control routes
admin.get("/provider", userAuth, getAllProviders);
admin.delete("/providerSus/:id", userAuth, suspendProvider);



async function getAllAdmins(req, res) {
  try {
    let allAdmin = await Admin.getAll();
    res.status(200).json(allAdmin);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
}

async function getAdminById(req, res) {
  try {
    let AdminById = await Admin.getById(req.params.id);
    res.status(200).json(AdminById);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
}

async function updateAdmin(req, res) {
  try {
    let updateAdmin = await Admin.updateUser(req.params.id, req.body);
    res.status(200).json(updateAdmin);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
}

async function deleteAdmin(req, res) {
  try {
    let deletedAdmin = await Admin.hide(req.params.id);
    res.status(202).json(deletedAdmin);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
}

async function suspendAdmin(req, res) {
  try {
    let suspendAdmin = await Admin.suspend(req.params.id);
    res.status(202).json(suspendAdmin);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
}



// customer control functions

async function getAllCustomers(req, res) {
  try {
    let allCustomers = await Customer.getAll();
    return res.status(200).json(allCustomers);
  } catch (error) {
    console.log(error);
    res.status(500).json({
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
    res.status(500).json({
      error: error
    });
  }
}

// provider control functions

async function getAllProviders(req, res) {
  try {
    let allProviders = await Provider.getAllProviders(serviceModel);
    res.status(200).json(allProviders);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
}


async function suspendProvider(req, res) {
  try {
    let deletedProvider = await Provider.suspendProvider(
      req.params.id,
      serviceModel
    );
    res.status(202).json(deletedProvider);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
}


module.exports = admin;
