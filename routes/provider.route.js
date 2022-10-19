"use strict";

const express = require("express");
// eslint-disable-next-line new-cap
const provider = express.Router();
const { checkProvider } = require("../middlewares/basic-auth");
const { signin, signup } = require("../controllers/provider.controller");
const serverError = require("../error-handlers/500");

const { providerAuth } = require("../middlewares/bearer-auth");

const { Provider, serviceModel } = require("../models");

provider.post("/provider/signup", checkProvider, signup);
provider.post("/provider/signin", signin);
provider.get("/providers", providerAuth, getAllProviders);


provider.get("/provider/:id", serverError, providerAuth, getProvider);
provider.put("/provider/:id", providerAuth, updateProvider);
provider.delete("/providerHold/:id", providerAuth, holdServices);
provider.delete("/providerSus/:id", providerAuth, suspendProvider);

provider.get("/provider", (req, res) => {
  res.send("Hello Provider");
});

async function createNewProvider(req, res) {
  try {
    const obj = req.body;
    let newProvider = await Provider.create(obj);
    res.status(201).json(newProvider);
  } catch (error) {
    console.log(error.errors[0].message);
    res.status(200).json({
      error: error.errors[0].message,
    });
  }
}

async function getAllProviders(req, res) {
  try {
    let allProviders = await Provider.getAllProviders(serviceModel);
    res.status(200).json(allProviders);
  } catch (error) {
    console.log(error);
    res.status(200).json({
      error: error,
    });
  }
}

async function getProvider(req, res) {
  try {
    let requestedProvider = await Provider.getProvider(
      req.params.id,
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

async function updateProvider(req, res) {
  try {
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

async function suspendProvider(req, res) {
  try {
    let deletedProvider = await Provider.suspendProvider(
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
