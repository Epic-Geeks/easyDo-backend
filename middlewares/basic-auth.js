"use strict";

const models = require("../models/index");


const checkSignup = async (req, res, next) => {
  try {
    let reqURL = req.url.toLowerCase();
    let requested = reqURL.split("/")[1];
    let model = models[`${requested}Model`];

    const username = await model.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (username) {
      return res.status(409).send("Username already taken");
    }

    const email = await model.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (email) {
      return res.status(409).send("Email already taken");
    }

    return next();
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal Server Error " + e.message || e);
  }
};

module.exports = {
  checkSignup
};
