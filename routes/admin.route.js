"use strict";

const express = require("express");
// eslint-disable-next-line new-cap
const admin = express.Router();

admin.get("/admin", (req, res) => {
  res.send("Hello Admin");
});

console.log("admin.route.js");
module.exports = admin;
