"use strict";

class Provider {
  constructor(model) {
    this.model = model;
  }
  // CRUD methods for the collection go here
  check(req, res, next) {
    console.log("Provider.check");
    next();
  }

  createProvider(obj) {
    try {
      return this.model.create(obj);
    } catch (e) {
      console.log("Error creating new Provider", e.message);
    }
  }

  getAllProviders(Services) {
    try {
      const allProviders = this.model.findAll({
        where: { visibility: true },
        include: [Services],
      });
      return allProviders;
    } catch (e) {
      console.log("Error while getting customers", e.message);
      return "Error while getting customers";
    }
  }

  getProvider(id, Services) {
    try {
      return this.model.findOne({ where: { id }, include: [Services] });
    } catch (e) {
      console.log("Error getting provider", e.message);
    }
  }

  async updateProvider(id, obj, Services) {
    try {
      let targetedProvider = await this.model.findOne({
        where: { id },
        include: [Services],
      });
      return await targetedProvider.update(obj);
    } catch (e) {
      console.log(e);
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
      console.log(e);
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
      console.log(e);
    }
  }
}

module.exports = Provider;
