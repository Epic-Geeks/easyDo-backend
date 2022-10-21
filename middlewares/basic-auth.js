"use strict";

const { customerModel, providerModel, adminModel } = require("../models/index");

const checkSignup = async (req, res, next) => {
  try {
    const username =
      (await customerModel.findOne({
        where: {
          username: req.body.username,
        },
      })) ||
      (await providerModel.findOne({
        where: {
          username: req.body.username,
        },
      })) ||
      (await adminModel.findOne({
        where: {
          username: req.body.username,
        },
      }));

    if (username) {
      return res.status(409).send("Username already taken");
    }

    const email =
      (await customerModel.findOne({
        where: {
          email: req.body.email,
        },
      })) ||
      (await providerModel.findOne({
        where: {
          email: req.body.email,
        },
      })) ||
      (await adminModel.findOne({
        where: {
          email: req.body.email,
        },
      }));

    if (email) {
      return res.status(409).send("Email already taken");
    }

    return next();
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal Server Error " + e?.message || e);
  }
};

module.exports = {
  checkSignup,
};
