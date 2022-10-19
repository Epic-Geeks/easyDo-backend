"use strict";

const express = require("express");
// eslint-disable-next-line new-cap
const provider = express.Router();
const { checkSignup } = require("../middlewares/basic-auth");
const { signin, signup } = require("../controllers/controller");
const serverError = require("../error-handlers/500");

const { userAuth } = require("../middlewares/bearer-auth");

const { Provider, serviceModel, orderModel } = require("../models");
const { uploadProvider } = require("../upload/providerPic");

provider.post("/provider/signup", uploadProvider.array("providerPic", 1), checkSignup, signup);
provider.post("/provider/signin", signin);

provider.get("/provider/:id", serverError, userAuth, getProvider);

provider.put("/provider/:id", uploadProvider.array("provider", 1), userAuth, updateProvider);

provider.delete("/provider/:id", userAuth, holdServices);


async function getProvider(req, res) {
  try {
    let requestedProvider = await Provider.getProvider(
      req.params.id,
      serviceModel,
      orderModel
    );
    res.status(200).json(requestedProvider);
  } catch (error) {
    console.log(error);
    res.status(200).json({
      error: error,
    });
  }
}

async function updateProvider(req, res) {
  try {
    if (req.files && req.files.length > 0) {
      req.body.providerPic = req.files.map(
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
    res.status(200).json({
      error: error,
    });
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
    res.status(200).json({
      error: error,
    });
  }
}

module.exports = provider;
