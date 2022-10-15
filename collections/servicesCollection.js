"use strict";

class ServicesCollection {
  constructor(model) {
    this.model = model;
  }
  // CRUD methods for the collection go here
  check (req, res, next) {
    console.log("ServicesCollection.check");
    next();
  }
}

module.exports = ServicesCollection;
