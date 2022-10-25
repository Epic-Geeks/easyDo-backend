"use strict";

const models = require("../models");
const { serviceModel, customerModel } = require("../models");

const ACL = async (req, res, next) => {
  let reqURL = req.url.toLowerCase();
  let requested = reqURL.split("/")[1];
  let method = req.method;

  if (
    method == "POST" &&
    requested == "order" &&
    req.userInfo.role == "customer"
  ) {
    return next();
  }

  if (
    method == "POST" &&
    requested == "service" &&
    req.userInfo.role == "provider"
  ) {
    return next();
  }

  if (
    (method == "DELETE" || method == "PUT") &&
    requested == "customer" &&
    (req.userInfo.role === "customer" || req.userInfo.role === "admin") &&
    (req.userInfo.id == req.params.id || req.userInfo.role === "admin")
  ) {
    return next();
  }

  if (
    (method == "DELETE" || method == "PUT") &&
    requested == "provider" &&
    (req.userInfo.role === "provider" || req.userInfo.role === "admin") &&
    (req.userInfo.id == req.params.id || req.userInfo.role === "admin")
  ) {
    return next();
  }

  if (
    (method == "DELETE" || method == "PUT") &&
    requested == "service" &&
    (req.userInfo.role === "provider" || req.userInfo.role === "admin")
  ) {
    try {
      const id = req.params.id;
      const one = await serviceModel.findOne({ where: { id } });
      console.log(one.providerID === req.userInfo.id);
      if (one.providerID === req.userInfo.id || req.userInfo.role === "admin") {
        return next();
      }
      let error = {
        status: 403,
        message: "Not Allowed...!",
      };
      return next(error);
    } catch (error) {
      return next(error);
    }
  }

  if (
    method == "GET" &&
    (requested == "customer" || requested == "provider") &&
    req.userInfo.role == "admin"
  ) {
    return next();
  }

  if (
    (method == "DELETE" || method == "PUT") &&
    (requested == "admin" || requested == "suscustomer" || requested == "susprovider" || requested == "susadmin") &&
    (req.userInfo.role === "admin") &&
    (req.userInfo.id == req.params.id || req.userInfo.role === "admin")
  ) {
    return next();
  }

  res.send("you are not authorized");
};

module.exports = {
  ACL,
};

// just provider can create or update (info about the service) a service,
// just admin can update visiblity of the service,
// provider and admin can delete a service
// admin can delete a customer and provider
// only admin can create and delete admins
