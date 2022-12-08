"use strict";

const express = require("express");
// eslint-disable-next-line new-cap
const provider = express.Router();
const { checkSignup } = require("../middlewares/basic-auth");
const { signin, signup } = require("../controllers/controller");
const serverError = require("../error-handlers/500");

const { userAuth } = require("../middlewares/bearer-auth");

const { imgUpload } = require("../upload/imagesUplaod");
const { ACL } = require("../middlewares/ACL");
const {
  getProvider,
  updateProvider,
  holdServices,
} = require("../controllers/provider.controller");

provider.post(
  "/provider/signup",
  imgUpload.array("picture", 1),
  checkSignup,
  signup
);
provider.post("/signin", signin);

provider.get("/provider/:id", serverError, userAuth, getProvider);

provider.put(
  "/provider/:id",
  imgUpload.array("picture", 1),
  userAuth,
  ACL,
  updateProvider
);

provider.delete("/provider/:id", userAuth, ACL, holdServices);

module.exports = provider;
