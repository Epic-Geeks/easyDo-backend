"use strict";

module.exports = (req, res, next) => {
  try {
    console.log("ACL Middleware");
    next();
  } catch (error) {
    console.log("ACL Middleware error");
  }
};
