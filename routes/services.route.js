"use strict";

const express = require("express");
// eslint-disable-next-line new-cap
const services = express.Router();
const serverError = require("../error-handlers/500");
const { serviceAuth } = require("../middlewares/bearer-auth");
const { imgUpload } = require("../upload/imagesUplaod");
const { ACL } = require("../middlewares/ACL");
const {
  createNewService,
  getAllServices,
  getService,
  updateService,
  deleteService,
} = require("../controllers/services.controller");

services.post(
  "/service",
  imgUpload.array("picture", 3),
  serviceAuth,
  ACL,
  createNewService
);

services.get("/services", getAllServices);
services.get("/service/:id", serverError,serviceAuth, getService); // added the serviceAuth

services.put(
  "/service/:id",
  imgUpload.array("picture", 3),
  serviceAuth,
  ACL,
  updateService
);

services.delete("/service/:id", serverError, serviceAuth, ACL, deleteService);

module.exports = services;
