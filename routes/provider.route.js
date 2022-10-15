"use strict";

const express = require("express");
// eslint-disable-next-line new-cap
const provider = express.Router();

provider.get("/provider", (req, res) => {
  res.send("Hello Provider");
});

console.log("provider.route.js");
module.exports = provider;
