"use strict";

class AdminCollection {
  constructor(model) {
    this.model = model;
  }

  createAdmin(obj) {
    try {
      return this.model.create(obj);
    } catch (e) {
      console.log("Error creating new Admin", e.message);
    }
  }

  getAllAdmins() {
    try {
      const allAdmin = this.model.findAll();
      return allAdmin;
    } catch (e) {
      console.log("Error while getting Admins", e.message);
      return "Error while getting Admins";
    }
  }

  getAdminById(id) {
    try {
      return this.model.findOne({ where: { id } });
    } catch (e) {
      console.log("Error getting Admin", e.message);
    }
  }

  async updateAdmin(id, obj) {
    try {
      let targetedAdmin = await this.model.findOne({ where: { id } });
      return await targetedAdmin.update(obj);
    } catch (e) {
      console.log("Error update Admin", e.message);
    }
  }

  async hideAdmin(id) {
    try {
      let targetedAdmin = await this.model.findOne({ where: { id } });
      return await targetedAdmin.update({ visibility: false });
    } catch (e) {
      console.error(`Error While Deleting Admin With Id : ${id}`);
    }
  }

  async suspendAdmin(id) {
    try {
      let targetedAdmin = await this.model.findOne({ where: { id } });
      return await targetedAdmin.update({ visibility: false, suspend: true });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = AdminCollection;
