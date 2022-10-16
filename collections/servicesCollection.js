"use strict";

class ServicesCollection {
  constructor(model) {
    this.model = model;
  }
  // CRUD methods for the collection go here
  check(req, res, next) {
    console.log("ServicesCollection.check");
    next();
  }
  createService(obj) {
    try {
      return this.model.create(obj);
    } catch (e) {
      console.log("Error creating new Service", e.message);
    }
  }

  getAllServices() {
    try {
      const allServices = this.model.findAll();
      return allServices;
    } catch (e) {
      console.log("Error while getting services", e.message);
      return "Error while getting services";
    }
  }

  getService(id) {
    try {
      return this.model.findOne({ where: { id } });
    } catch (e) {
      console.log("Error getting service", e.message);
    }
  }

  async hideService(id) {
    try {
      let targetedService = await this.model.findOne({ where: { id } });
      return await targetedService.update({ visibility: false });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = ServicesCollection;
