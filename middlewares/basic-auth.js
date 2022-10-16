"use strict";
const Customer = require("../models").customerModel;

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

module.exports = {
  saveCustomer
};
