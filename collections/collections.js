"use strict";

class Collection {
  constructor(model) {
    this.model = model;
  }

  create(obj) {
    try {
      return this.model.create(obj);
    } catch (e) {
      console.log("Error in creating", e.message || e);
      return("Error in creating", e.message || e);
    }
  }

  getAll() {
    try {
      const all = this.model.findAll({ where: { visibility: true } });
      return all;
    } catch (e) {
      console.log("Error while getting all recoreds", e.message || e);
      return ("Error while getting all recoreds", e.message || e);
    }
  }

  getById(id) {
    try {
      return this.model.findOne({ where: { id } });
    } catch (e) {
      console.log("Error getting recored..!", e.message || e);
      return("Error getting recored..!", e.message || e);
    }
  }

  async update(id, obj) {
    try {
      let targeted = await this.model.findOne({ where: { id } });
      return await targeted.update(obj);
    } catch (e) {
      console.log("Error update recored", e.message || e);
      return("Error update recored", e.message || e);
    }
  }

  async hide(id) {
    try {
      let targeted = await this.model.findOne({ where: { id } });
      return await targeted.update({ visibility: false });
    } catch (e) {
      console.error(`Error While Deleting recored With Id : ${id}`, e.message || e);
      console.error(`Error While Deleting recored With Id : ${id}`, e.message || e);
    }
  }

  async suspend(id) {
    try {
      let targeted = await this.model.findOne({ where: { id } });
      return await targeted.update({ visibility: false, suspend: true });
    } catch (e) {
      console.error(`Error While suspend recored With Id : ${id}`, e.message || e);
      return(`Error While suspend recored With Id : ${id}`, e.message || e);
    }
  }

  async updateOrderStatus(id, status) {
    try {
      let targetedOrder = await this.model.findOne({ where: { id } });
      return await targetedOrder.update({ status: status });
    } catch (e) {
      console.log("Error while update order status", e.message || e);
      return ("Error while update order status", e.message || e);
    }
  }
}

module.exports = Collection;
