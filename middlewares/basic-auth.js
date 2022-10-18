"use strict";

const { customerModel, providerModel, adminModel} = require("../models/index");


const checkCustomer = async (req, res, next) => {
  try {
    const username = await customerModel.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (username) {
      return res.status(409).send("Username already taken");
    }

    const email = await customerModel.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (email) {
      return res.status(409).send("Email already taken");
    }

    next();
  } catch (e) {
    console.log(e);
  }
};

const checkProvider = async (req, res, next) => {
  try {
    const username = await providerModel.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (username) {
      return res.status(409).send("Username already taken");
    }

    const email = await providerModel.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (email) {
      return res.status(409).send("Email already taken");
    }
    next();
  } catch (e) {
    console.log(e);
  }
};

const checkAdmin = async (req, res, next) => {
  try {
    const username = await adminModel.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (username) {
      return res.status(409).send("Username already taken");
    }

    const email = await adminModel.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (email) {
      return res.status(409).send("Email already taken");
    }

    next();
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  checkCustomer,
  checkProvider,
  checkAdmin,
};
