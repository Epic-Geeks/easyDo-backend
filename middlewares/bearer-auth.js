"use strict";

const models = require("../models/index");

const userAuth = async (req, res, next) => {
  try {
    let reqURL = req.url.toLowerCase();
    let requested = reqURL.split("/")[1];
    let model = models[`${requested}Model`];

    if (!req.headers.authorization) {
      return res.status(401).send("You're not authorized..!!");
    }
    const token = req.headers.authorization.split(" ")[1];
    const validUser = model.authenticateToken(token);
    const userInfo = await model.findOne({
      where: { username: validUser.username },
    });
    if (userInfo) {
      req[`${requested}`] = userInfo;
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
  userAuth
};
