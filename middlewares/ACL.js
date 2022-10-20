"use strict";

const { serviceModel } = require("../models");

const checkCustomerRole = (req, res, next) => {
  try {
    if (req.userInfo.role === ('customer')) {
      next();
    }
  } catch (error) {
    console.log("ACL Middleware error");
  }
};

const checkIsSameCustomer = (req, res, next) => {
  try {
    if (req.userInfo.role === ('customer') && req.userInfo.id == req.params.id) {
      return next();
    }
    return res.status(401).send("Not Authoriezd..!!")
  } catch (error) {
    console.log("ACL Middleware error");
  }
};

const checkIsSameProvider = (req, res, next) => {
  try {
    if (req.userInfo.role === ('provider') && req.userInfo.id == req.params.id) {
      return next();
    }
    return res.status(401).send("Not Authoriezd..!!")
  } catch (error) {
    console.log("ACL Middleware error");
  }
};

const checkProviderRole = (req, res, next) => {
  try {
    if (req.userInfo.role === ('provider')) {
      next();
    }
  } catch (error) {
    console.log("ACL Middleware error");
  }
};

const checkServiceOwner = async (req, res, next) => {

  try {
    const id = req.params.id;
    const one = await serviceModel.findOne({ where: { id } });
    console.log(one.providerID === req.userInfo.id);
    if (one.providerID === req.userInfo.id) {
      return next();
    }
    let error = {
      status: 403,
      message: "Not Allowed...!"
    }
    return next(error);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  checkCustomerRole,
  checkIsSameProvider,
  checkIsSameCustomer,
  checkProviderRole,
  checkServiceOwner
}












 // just provider can create or update (info about the service) a service,
  // just admin can update visiblity of the service,
  // provider and admin can delete a service
  // admin can delete a customer and provider
  // only admin can create and delete admins