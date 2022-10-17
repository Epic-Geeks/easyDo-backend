"use strict";

const { Admin } = require("../models/index.js");
const express = require("express");
// eslint-disable-next-line new-cap
const admin = express.Router();
const { checkAdmin } = require("../middlewares/basic-auth");
const { signup, signin } = require("../controllers/admin.controller.js");
const { adminAuth } = require("../middlewares/bearer-auth");
admin.get("/admin", (req, res) => {
  res.send("Hello Admin");
});

admin.post("/admin/signup", checkAdmin, signup);
admin.post("/admin/signin", signin);
admin.get("/admins", adminAuth, getAllAdmins);
admin.get("/admin/:id", adminAuth, getAdminById);
admin.put("/admin/:id", adminAuth, updateAdmin);
admin.delete("/admin/:id", adminAuth, deleteAdmin);
admin.delete("/suspendadmin/:id", adminAuth, suspendAdmin);

async function getAllAdmins(req, res) {
  try {
    let allAdmin = await Admin.getAll();
    res.status(200).json(allAdmin);
  } catch (error) {
    console.log(error);
    res.status(200).json({
      error: error
    });
  }
}

async function getAdminById(req, res) {
  try {
    let AdminById = await Admin.getById(req.params.id);
    res.status(200).json(AdminById);
  } catch (error) {
    console.log(error);
    res.status(200).json({
      error: error
    });
  }
}

async function updateAdmin(req, res) {
  try {
    let updateAdmin = await Admin.update(req.params.id, req.body);
    res.status(200).json(updateAdmin);
  } catch (error) {
    console.log(error);
    res.status(200).json({
      error: error
    });
  }
}

async function deleteAdmin(req, res) {
  try {
    let deletedAdmin = await Admin.hide(req.params.id);
    res.status(202).json(deletedAdmin);
  } catch (error) {
    console.log(error);
    res.status(200).json({
      error: error
    });
  }
}

async function suspendAdmin(req, res) {
  try {
    let suspendAdmin = await Admin.suspend(req.params.id);
    res.status(202).json( suspendAdmin);
  } catch (error) {
    console.log(error);
    res.status(200).json({
      error: error
    });
  }
}

console.log("admin.route.js");
module.exports = admin;
