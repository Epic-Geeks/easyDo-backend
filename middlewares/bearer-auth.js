"use strict";

const { customerModel, AdminModel, ProviderModel } = require("../models/index");

const customerAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return next("You're not authorized..!!");
    }
    const token = req.headers.authorization.split(" ")[1];
    const validUser = customerModel.authenticateToken(token);
    const customerInfo = await customerModel.findOne({
      where: { username: validUser.username }
    });
    if (customerInfo) {
      req.customer = customerInfo;
      req.token = customerInfo.token;
      return next();
    } else {
      return next("You're not authorized..!!");
    }
  } catch (error) {
    return next(error.message || error);
  }
};

const adminAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return next("You're not authorized..!!");
    }
    const token = req.headers.authorization.split(" ")[1];
    const validUser = AdminModel.authenticateToken(token);
    const adminInfo = await AdminModel.findOne({
      where: { username: validUser.username }
    });
    if (adminInfo) {
      req.admin = adminInfo;
      req.token = adminInfo.token;
      return next();
    } else {
      return next("You're not authorized..!!");
    }
  } catch (error) {
    return next(error.message || error);
  }
};

const providerAuth = async(req, res, next)=>{
  try {
    if (!req.headers.authorization) {
      return next("You're not authorized..!!");
    }
    const token = req.headers.authorization.split(" ")[1];
    const validUser = ProviderModel.authenticateToken(token);
    const providerInfo = await ProviderModel.findOne({
      where: { username: validUser.username }
    });
    if (providerInfo) {
      req.provider = providerInfo;
      req.token = providerInfo.token;
      return next();
    } else {
      return next("You're not authorized..!!");
    }
  } catch (error) {
    return next(error.message || error);
  }

};
module.exports = {
  customerAuth,
  adminAuth,
  providerAuth
};
