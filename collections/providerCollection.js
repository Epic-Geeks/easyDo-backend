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
}

module.exports = Provider;
