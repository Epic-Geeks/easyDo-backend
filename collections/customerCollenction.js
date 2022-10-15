"use strict";

class Customer {
  constructor(model) {
    this.model = model;
  }
  // CRUD methods for the collection go here
  check (req, res, next) {
    console.log("Customer.check");
    next();
  }
}

module.exports = Customer;
