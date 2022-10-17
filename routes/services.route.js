"use strict";

const { Service, ProviderModel } = require("../models");

const express = require("express");
// eslint-disable-next-line new-cap
const services = express.Router();
const serverError = require("../error-handlers/500");

services.get("/services", getAllServices);
services.post("/service", createNewService);

services.get("/service/:id", serverError, getService);
services.delete("/service/:id", deleteService);

services.get("/services", (req, res) => {
 res.send("Hello Services");
});

async function getAllServices(req, res) {
 let allServices = await Service.getAllServices(ProviderModel);
 res.status(200).json(allServices);
}

async function createNewService(req, res) {
 const obj = req.body;
 let newService = await Service.createService(obj);
 res.status(201).json(newService);
}

async function getService(req, res) {
 let requestedService = await Service.getService(req.params.id, ProviderModel);
 res.status(200).json(requestedService);
}

async function deleteService(req, res) {
 let deletedService = await Service.hideService(req.params.id, ProviderModel);
 res.status(202).json(deletedService);
}

console.log("services.route.js");
module.exports = services;
