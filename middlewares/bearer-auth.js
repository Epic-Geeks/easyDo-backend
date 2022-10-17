"use strict";

const { customerModel } = require("../models/index");

module.exports = async (req, res, next) => {
 try {
  if (!req.headers.authorization) {
   return next("You're not authorized..!!");
  }
  const token = req.headers.authorization.split(" ")[1];
  const validUser = customerModel.authenticateToken(token);
  const customerInfo = await customerModel.findOne({
   where: { username: validUser.username },
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
