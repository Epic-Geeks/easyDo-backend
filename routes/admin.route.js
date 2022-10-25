"use strict";

const express = require("express");
// eslint-disable-next-line new-cap
const admin = express.Router();
const { checkSignup } = require("../middlewares/basic-auth");
const { signup, signin } = require("../controllers/controller.js");
const { userAuth } = require("../middlewares/bearer-auth");
const { ACL } = require("../middlewares/ACL.js");
const {
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  suspendAdmin,
  getAllCustomers,
  suspendCustomer,
  getAllProviders,
  suspendProvider,
} = require("../controllers/admin.controller");
admin.get("/admin", (req, res) => {
  res.send("Hello Admin");
});

admin.post("/admin/signup", checkSignup, signup);

admin.get("/admin", userAuth, getAllAdmins);
admin.get("/admin/:id", userAuth, getAdminById);

admin.put("/admin/:id", userAuth, updateAdmin);

admin.delete("/admin/:id", userAuth, deleteAdmin);
admin.delete("/susAdmin/:id", userAuth, suspendAdmin);

// provider control routes
admin.get("/customer", userAuth, ACL, getAllCustomers);
admin.delete("/susCustomer/:id", userAuth, ACL, suspendCustomer);

// provider control routes
admin.get("/provider", userAuth, ACL, getAllProviders);
admin.delete("/susProvider/:id", userAuth, ACL, suspendProvider);

module.exports = admin;
