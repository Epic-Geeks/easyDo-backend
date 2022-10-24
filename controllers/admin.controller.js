"use strict";

const {
  Admin,
  Customer,
  Provider,
  serviceModel,
} = require("../models/index.js");

const errorObj = (error) => {
  return {
    message: error,
    status: 500,
  };
};

async function getAllAdmins(req, res, next) {
  try {
    let allAdmin = await Admin.getAll();
    res.status(200).json(allAdmin);
  } catch (error) {
    console.log(error);
    next(errorObj(error));
  }
}

async function getAdminById(req, res) {
  try {
    let AdminById = await Admin.getById(req.params.id);
    res.status(200).json(AdminById);
  } catch (error) {
    console.log(error);
    next(errorObj(error));
  }
}

async function updateAdmin(req, res) {
  try {
    let updateAdmin = await Admin.updateUser(req.params.id, req.body);
    res.status(200).json(updateAdmin);
  } catch (error) {
    console.log(error);
    next(errorObj(error));
  }
}

async function deleteAdmin(req, res) {
  try {
    let deletedAdmin = await Admin.hide(req.params.id);
    res.status(202).json(deletedAdmin);
  } catch (error) {
    console.log(error);
    next({
      message: error,
      status: 410,
    });
  }
}

async function suspendAdmin(req, res) {
  try {
    let suspendAdmin = await Admin.suspend(req.params.id);
    res.status(202).json(suspendAdmin);
  } catch (error) {
    console.log(error);
    next({
      message: error,
      status: 410,
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
    next(errorObj(error));
  }
}

async function suspendCustomer(req, res) {
  try {
    let suspendCustomer = await Customer.suspend(req.params.id);
    res.status(202).json(suspendCustomer);
  } catch (error) {
    console.log(error);
    next({
      message: error,
      status: 410,
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
    next(errorObj(error));
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
    next({
      message: error,
      status: 410,
    });
  }
}

module.exports = {
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  suspendAdmin,
  getAllCustomers,
  suspendCustomer,
  getAllProviders,
  suspendProvider,
};
