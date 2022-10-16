'use strict';

const {modelOrder, modelService}= require('./models/index.js');

class AdminCollection {
  constructor(model) {
    this.model = model;
  }

  createAdmin (obj) {
    try {
      return this.model.create(obj);
    } catch (e) {
      console.log("Error creating new Admin", e.message);
    }
  }

  getAllAdmin () {
    try {
      const allAdmin = this.model.findAll();
      return allAdmin;
    } catch (e) {
      console.log("Error while getting Admins", e.message);
      return "Error while getting Admins";
    }
  }

  getAdminById (id) {
    try {
      return this.model.findOne({ where: { id } });
    } catch (e) {
      console.log("Error getting Admin", e.message);
    }
  }

  async updateAdmin (id, obj) {
    try {
      let targetedAdmin = await this.model.findOne({ where: { id } });
      return await targetedAdmin.update(obj);
    } catch (e) {
      console.log("Error update Admin", e.message);
    }
  }

  async deleteAdmin(id) {
    try {
        return await this.model.destroy({ where: { id } });
    } catch (e) {
        console.error(`Error While Deleting Admin With Id : ${id}`);
    }
}

async getAllOrderByAdmin () {
    try {
      const allOrder = this.model.findAll({ modelOrder });
      return allOrder;
    } catch (e) {
      console.log("Error while getting all order by Admin", e.message);
      return "Error while getting all order by Admin";
    }
  }

  async getAllServiceByAdmin () {
    try {
      const allService = this.model.findAll({ modelService });
      return allService;
    } catch (e) {
      console.log("Error while getting all Service by Admin", e.message);
      return "Error while getting all Service by Admin";
    }
  }


}
module.exports = AdminCollection;