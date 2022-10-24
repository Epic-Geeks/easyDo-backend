"use strict";

const express = require("express");
// eslint-disable-next-line new-cap
const provider = express.Router();
const { checkSignup } = require("../middlewares/basic-auth");
const { signin, signup } = require("../controllers/controller");
const serverError = require("../error-handlers/500");

const { userAuth } = require("../middlewares/bearer-auth");

const { Provider, serviceModel, orderModel, providerModel } = require("../models");
const { imgUpload } = require("../upload/imagesUplaod");
const { ACL } = require("../middlewares/ACL");

provider.post("/provider/signup", imgUpload.array("picture", 1), checkSignup, signup);
provider.post("/provider/signin", signin);

provider.get("/provider/:id", serverError, userAuth, getProvider);

provider.put("/provider/:id", imgUpload.array("picture", 1), userAuth, ACL, updateProvider);

provider.delete("/provider/:id", userAuth, ACL, holdServices);

const errorObj = (error) => {
  return {
    message: error,
    status: 500
  }
};

async function getProvider(req, res, next) {
  try {
    let requestedProvider = await Provider.getProvider(
      req.params.id,
      serviceModel,
      orderModel
    );
    res.status(200).json(requestedProvider);
  } catch (error) {
    console.log(error);
    next(errorObj(error));
  }
}

async function updateProvider(req, res, next) {
  try {
    if (req.files && req.files.length > 0) {
      req.body.picture = req.files.map(
        (file) => `${process.env.BACKEND_URL}/${file.filename}`
      );
    }
    let requestedProvider = await Provider.updateProvider(
      req.params.id,
      req.body,
      serviceModel
    );
    res.status(200).json(requestedProvider);
  } catch (error) {
    console.log(error);
    next(errorObj(error));
  }
}

async function holdServices(req, res) {
  try {
    let deletedProvider = await Provider.holdServices(
      req.params.id,
      serviceModel
    );
    res.status(202).json(deletedProvider);
  } catch (error) {
    console.log(error);
    next(errorObj(error));
  }
}

module.exports = provider;
