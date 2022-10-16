"use strict";

class Provider {
  constructor(model) {
    this.model = model;
  }
  // CRUD methods for the collection go here
  check (req, res, next) {
    console.log("Provider.check");
    next();
  }

  createProvider (obj) {
    try {
      return this.model.create(obj);
    } catch (e) {
      console.log("Error creating new provider", e.message);
    }
  }

  getAllProviders () {
    try {
      const allProviders = this.model.findAll({ where: { visibility: true } });
      return allProviders;
    } catch (e) {
      console.log("Error while getting providers", e.message);
      return "Error while getting providers";
    }
  }

  getProvider (id) {
    try {
      return this.model.findOne({ where: { id } });
    } catch (e) {
      console.log("Error getting provider", e.message);
    }
  }

  async updateProvider (id, obj) {
    try {
      let targetedProvider = await this.model.findOne({ where: { id } });
      return await targetedProvider.update(obj);
    } catch (e) {
      console.log(e);
    }
  }

  async hideProvider (id) { 
      try {
        let targetedProvider = await this.model.findOne({ where: { id } });
        return await targetedProvider.update({ visibility: false });
      } catch (e) {
        console.log(e);
      }
    }

    async suspendProvider (id) {
      try {
        let targetedProvider = await this.model.findOne({ where: { id } });
        return await targetedProvider.update({ status: "suspended" });
      } catch (e) {
        console.log(e);
      }
    }
    

    
}

module.exports = Provider;
