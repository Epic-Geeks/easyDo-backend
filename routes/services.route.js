"use strict";

const express = require("express");
// eslint-disable-next-line new-cap
const services = express.Router();

services.get("/services", (req, res) => {
  res.send("Hello Services");
});

console.log("services.route.js");
module.exports = services;
