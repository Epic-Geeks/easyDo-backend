"use strict";

const { customerModel, providerModel } = require("../models/index");
const models = require("../models/index");

const userAuth = async (req, res, next) => {
  try {
    let reqURL = req.url.toLowerCase();
    let requested = reqURL.split("/")[1];
    let model = models[`${requested}Model`];
    console.log("model", requested, models);

    if (!req.headers.authorization) {
      return res.status(401).send("You're not authorized..!!");
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
      return res.status(401).send("You're not authorized..!!");
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
      return res.status(401).send("You're not authorized..!!");
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


// Path: routes/services.route.js



// const token = req.headers.authorization.split(" ")[1];
// let validUser, userInfo;
// if (requested.includes("service")) {
//   providerModel.authenticateToken(token);
//   validUser = await providerModel.authenticateToken(token);
//   userInfo = await providerModel.findOne({
//     where: { username: validUser.username },
//   });
// } else if (requested.includes("order")) {
//   validUser = await customerModel.authenticateToken(token);
//   userInfo = await customerModel.findOne({
//     where: { username: validUser.username },
//   });
// } else {
//   validUser = await model.authenticateToken(token);
//   validUser = model.authenticateToken(token);
//   userInfo = await model.findOne({
//     where: { username: validUser.username },
//   });
// }



// const servicesAuth = async (req, res, next) => {
//   try {
  
//     if (!req.headers.authorization) {
//       return res.status(401).send("You're not authorized..!!");
//     }
//     const token = req.headers.authorization.split(" ")[1];
//     const validUser = providerModel.authenticateToken(token);
//     const userInfo = await providerModel.findOne({
//       where: { username: validUser.username },
//     }) || await adminModel.findOne({
//       where: { username: validUser.username },
//     });
  
//     if (userInfo) {
//       req[`${requested}`] = userInfo;
//       req.token = userInfo.token;
//       return next();
//     } else {
//       return res.status(401).send("You're not authorized..!!");
//     }
//   } catch (error) {
//     return res.status(500).send(error.message || error);
//   }
// };
