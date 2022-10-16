"use strict";

const express = require("express");
// eslint-disable-next-line new-cap
const provider = express.Router();
const { Provider } = require("../models");

provider.get("/providers", getAllProviders);
provider.post("/provider", createNewProvider);
provider.get("/provider/:id", getProvider);
provider.put("/provider/:id", updateProvider);
provider.delete("/provider/:id", deleteProvider);

provider.get("/provider", (req, res) => {
  res.send("Hello Provider");
});

async function createNewProvider(req, res) {
  const obj = req.body;
  let newProvider = await Provider.createProvider(obj);
  res.status(201).json(newProvider);
}

async function getAllProviders(req, res) {
  let allProviders = await Provider.getAllProviders();
  res.status(200).json(allProviders);
}

async function getProvider(req, res) {
  let requestedProvider = await Provider.getProvider(req.params.id);
  res.status(200).json(requestedProvider);
}

async function updateProvider(req, res) {
  let requestedProvider = await Provider.updateProvider(req.params.id, req.body);
  res.status(200).json(requestedProvider);
}

async function deleteProvider(req, res) {
  let deletedProvider = await Provider.hideProvider(req.params.id);
  res.status(202).json(deletedProvider);
}

module.exports = provider;
