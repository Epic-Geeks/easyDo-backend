"use strict";
const Customer = require("../models").customerModel;
const Provider = require("../models").ProviderModel;
const { AdminModel } = require("../models");

const saveCustomer = async (req, res, next) => {
  try {

    const username = await Customer.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (username) {
      return res.status(409).send("Username already taken");
    }


    const email = await Customer.findOne({
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

const saveProvider = async (req, res, next) => {
  try {
    const username = await Provider.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (username) {
      return res.status(409).send("Username already taken");
    }


    const email = await Provider.findOne({
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
    const username = await AdminModel.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (username) {
      return res.status(409).send("Username already taken");
    }


    const email = await AdminModel.findOne({
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
  saveCustomer,
  saveProvider,
  checkAdmin
};
