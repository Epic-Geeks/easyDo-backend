"use strict";

class customerCollection {
  constructor(model) {
    this.model = model;
  }
  // CRUD methods for the collection go here
  check(req, res, next) {
    console.log("Customer.check");
    next();
  }

  createCustomer(obj) {
    try {
      return this.model.create(obj);
    } catch (e) {
      console.log("Error creating new customer", e.message);
    }
  }

  getAllCustomers() {
    try {
      const allCustomers = this.model.findAll({ where: { visibility: true } });
      return allCustomers;
    } catch (e) {
      console.log("Error while getting customers", e.message);
      return "Error while getting customers";
    }
  }

  getCustomer(id) {
    try {
      return this.model.findOne({ where: { id } });
    } catch (e) {
      console.log("Error getting customer", e.message);
    }
  }

  async updateCustomer(id, obj) {
    try {
      let targetedCustomer = await this.model.findOne({ where: { id } });
      return await targetedCustomer.update(obj);
    } catch (e) {
      console.log(e);
    }
  }

  async hideCustomer(id) {

    try {
      let targetedCustomer = await this.model.findOne({ where: { id } });
      return await targetedCustomer.update({ visibility: false });
    } catch (e) {
      console.log(e);
    }
  }

  async suspendCustomer(id) {
    try {
      let targetedCustomer = await this.model.findOne({ where: { id } });
      return await targetedCustomer.update({ status: "suspended" });// need to edit
    } catch (e) {
      console.log(e);
    }
  }

}

module.exports = customerCollection;
