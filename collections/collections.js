"use strict";
const bycrpt = require("bcrypt");
class Collection {
  constructor(model) {
    this.model = model;
  }

  create(obj) {
    try {
      return this.model.create(obj);
    } catch (e) {
      console.log("Error in creating", e.message || e);
      return ("Error in creating", e.message || e);
    }
  }

  getAll() {
    try {
      const all = this.model.findAll({ where: { visibility: true } });
      return all;
    } catch (e) {
      console.log("Error while getting all records", e.message || e);
      return ("Error while getting all records", e.message || e);
    }
  }

  getById(id) {
    try {
      return this.model.findOne({ where: { id } });
    } catch (e) {
      console.log("Error getting record..!", e.message || e);
      return ("Error getting record..!", e.message || e);
    }
  }

  async updateUser(id, obj) {
    try {
      obj.password = await bycrpt.hash(obj.password, 10)
      let targeted = await this.model.findOne({ where: { id } });
      return await targeted.update(obj);
    } catch (e) {
      console.log("Error update record: " + e.errors[0].message);
      return ("Error update record: " + e.errors[0].message);
    }
  }

  async updateService(id, obj) {
    try {
      const service = await this.model.findOne({ where: { id } });
      return await service.update(obj);
    } catch (e) {
      console.log("Error update recored: " + e.errors[0].message);
      return ("Error update recored: " + e.errors[0].message);
    }
  }

  async hide(id) {
    try {
      let targeted = await this.model.findOne({ where: { id } });
      return await targeted.update({ visibility: false });
    } catch (e) {
      console.error(`Error While Deleting recored With Id : ${id}`, e.message || e);
      return (`Error While Deleting recored With Id : ${id}`, e.message || e);
    }
  }

  async suspend(id) {
    try {
      let targeted = await this.model.findOne({ where: { id } });
      return await targeted.update({ visibility: false, suspend: true });
    } catch (e) {
      console.error(`Error While suspend recored With Id : ${id}`, e.message || e);
      return (`Error While suspend recored With Id : ${id}`, e.message || e);
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
  // exclusive for Service
  getAllServices(Provider) {
    try {
      const allServices = this.model.findAll({
        where: { visibility: true },
        include: [Provider],
      });
      return allServices;
    } catch (e) {
      console.log("Error while getting services", e.message || e);
      return ("Error while getting services", e.message || e);
    }
  }

  getService(id, Provider) {
    try {
      return this.model.findOne({ where: { id }, include: [Provider] });
    } catch (e) {
      console.log("Error getting service", e.message || e);
      return ("Error getting service", e.message || e);
    }
  }

  async hideService(id, Provider) {
    try {
      let targetedService = await this.model.findOne({
        where: { id },
        include: [Provider],
      });
      return await targetedService.update({ visibility: false });
    } catch (e) {
      console.log("Error while hide service ", e.message || e);
      return ("Error while hide service ", e.message || e);
    }
  }

  // exclusive for provider
  getAllProviders(Services) {
    try {
      const allProviders = this.model.findAll({
        where: { visibility: true },
        include: [Services],
      });
      return allProviders;
    } catch (e) {
      console.log("Error while getting customers", e.message || e);
      return ("Error while getting customers", e.message || e);
    }
  }

  getProvider(id, Services) {
    try {
      return this.model.findOne({ where: { id }, include: [Services] });
    } catch (e) {
      console.log("Error getting provider", e.message || e);
      return ("Error getting provider", e.message || e);
    }
  }

  async updateProvider(id, obj, Services) {
    try {

      const password = obj.password;
      const hashPassword = await bycrpt.hash(password, 10);
      obj.password = hashPassword;
      let targetedProvider = await this.model.findOne({
        where: { id },
        include: [Services],
      });
      return await targetedProvider.update(obj);
    } catch (e) {
      if (e) {
        console.log("Error update recored: " + e.errors[0].message);
        return ("Error update recored: " + e.errors[0].message);
      }

    }
  }

  async holdServices(id, Services) {
    try {
      let targetedProvider = await this.model.findOne({
        where: { id },
        include: [Services],
      });
      let providerServices = await Services.findAll({
        where: { providerID: targetedProvider.id },
      });
      await providerServices.forEach((service) =>
        service.update({ visibility: false })
      );
      return targetedProvider;
    } catch (e) {
      console.log("Error while hold services ", e.message || e);
      return ("Error while hold services ", e.message || e);

    }
  }

  async suspendProvider(id, Services) {
    try {
      let targetedProvider = await this.model.findOne({
        where: { id },
        include: [Services],
      });
      await targetedProvider.update({ visibility: false, suspend: true });
      let providerServices = await Services.findAll({
        where: { providerID: targetedProvider.id },
      });
      await providerServices.forEach((service) =>
        service.update({ visibility: false })
      );
      return targetedProvider;
    } catch (e) {
      console.log("Error while suspend provider ", e.message || e);
      return ("Error while suspend provider ", e.message || e);

    }
  }

}

module.exports = Collection;
