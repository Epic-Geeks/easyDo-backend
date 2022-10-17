"use strict";
const { Admin } = require("../models");
const express = require("express");
// eslint-disable-next-line new-cap
const admin = express.Router();

admin.get("/admin", (req, res) => {
 res.send("Hello Admin");
});

admin.get("/admin", getAllAdmin);
admin.post("/admin", createNewAdmin);
admin.get("/admin/:id", getAdminById);
admin.put("/admin/:id", updateAdmin);
admin.delete("/admin/:id", deleteAdmin);

async function createNewAdmin(req, res) {
 const obj = req.body;
 let newAdmin = await Admin.createAdmin(obj);
 res.status(201).json(newAdmin);
}

async function getAllAdmin(req, res) {
 let allAdmin = await Admin.getAllAdmin();
 res.status(200).json(allAdmin);
}

async function getAdminById(req, res) {
 let AdminById = await Admin.getAdminById(req.params.id);
 res.status(200).json(AdminById);
}

async function updateAdmin(req, res) {
 let updateAdmin = await Admin.updateAdmin(req.params.id, req.body);
 res.status(200).json(updateAdmin);
}

async function deleteAdmin(req, res) {
 let deletedAdmin = await Admin.deleteAdmin(req.params.id);
 res.status(202).json(deletedAdmin);
}

console.log("admin.route.js");
module.exports = admin;
