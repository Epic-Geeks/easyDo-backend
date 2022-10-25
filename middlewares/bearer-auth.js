"use strict";

const { customerModel, providerModel } = require("../models/index");
const models = require("../models/index");

const userAuth = async (req, res, next) => {
  try {
    let reqURL = req.url.toLowerCase();
    let requested = reqURL.split("/")[1];
    let model = models[`${requested}Model`];
    if (requested == "suscustomer" || requested == "susprovider" || requested == "susadmin") {
      model = models.adminModel
    }
    console.log("model", requested, models);

    if (!req.headers.authorization) {
      return res.status(511).send("Authentication Required");
    }
    const token = req.headers.authorization.split(" ")[1];
    const validUser = model.authenticateToken(token);
    console.log(validUser);
    const userInfo = await model.findOne({
      where: { username: validUser.username },
    });
    if (userInfo) {
      req.userInfo = userInfo;
      req.token = userInfo.token;
      return next();
    } else {
      return res.status(401).send("You're not authorized..!!");
    }
  } catch (error) {
    return res.status(500).send(error.message || error);
  }
};

const orderAuth = async (req, res, next) => {
  try {

    if (!req.headers.authorization) {
      return res.status(511).send("Authentication Required");
    }
    const token = req.headers.authorization.split(" ")[1];
    const validUser = customerModel.authenticateToken(token);
    console.log(validUser);
    const userInfo = await customerModel.findOne({
      where: { username: validUser.username },
    });
    if (userInfo) {
      req.userInfo = userInfo;
      req.token = userInfo.token;
      return next();
    } else {
      return res.status(401).send("You're not authorized..!!");
    }
  } catch (error) {
    return res.status(500).send(error.message || error);
  }
};


const serviceAuth = async (req, res, next) => {
  try {

    if (!req.headers.authorization) {
      return res.status(511).send("Authentication Required");
    }
    const token = req.headers.authorization.split(" ")[1];
    const validUser = providerModel.authenticateToken(token);
    console.log(validUser);
    const userInfo = await providerModel.findOne({
      where: { username: validUser.username },
    });
    if (userInfo) {
      req.userInfo = userInfo;
      req.token = userInfo.token;
      return next();
    } else {
      return res.status(401).send("You're not authorized..!!");
    }
  } catch (error) {
    return res.status(500).send(error.message || error);
  }
};


module.exports = {
  userAuth,
  orderAuth,
  serviceAuth
};
