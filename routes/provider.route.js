"use strict";

const express = require("express");
// eslint-disable-next-line new-cap
const provider = express.Router();
const { saveProvider } = require("../middlewares/basic-auth");
const { signin, signup } = require("../controllers/provider.controller");
const serverError = require("../error-handlers/500");

const { Provider, ServiceModel } = require("../models");

provider.post("/provider/signup", saveProvider, signup);
provider.post("/provider/signin", signin);
provider.get("/providers", getAllProviders);
provider.post("/provider", createNewProvider);
provider.get("/provider/:id", serverError, getProvider);
provider.put("/provider/:id", updateProvider);
provider.delete("/providerHold/:id", holdServices);

provider.delete("/providerSus/:id", suspendProvider);

provider.get("/provider", (req, res) => {
 res.send("Hello Provider");
});

async function createNewProvider(req, res) {
 const obj = req.body;
 let newProvider = await Provider.createProvider(obj);
 res.status(201).json(newProvider);
}

async function getAllProviders(req, res) {
 let allProviders = await Provider.getAllProviders(ServiceModel);
 res.status(200).json(allProviders);
}

async function getProvider(req, res) {
 let requestedProvider = await Provider.getProvider(
  req.params.id,
  ServiceModel
 );
 res.status(200).json(requestedProvider);
}

async function updateProvider(req, res) {
 let requestedProvider = await Provider.updateProvider(
  req.params.id,
  req.body,
  ServiceModel
 );
 res.status(200).json(requestedProvider);
}

async function holdServices(req, res) {
 let deletedProvider = await Provider.holdServices(req.params.id, ServiceModel);
 res.status(202).json(deletedProvider);
}

async function suspendProvider(req, res) {
 let deletedProvider = await Provider.suspendProvider(
  req.params.id,
  ServiceModel
 );
 res.status(202).json(deletedProvider);
}

console.log("provider.route.js");
module.exports = provider;
