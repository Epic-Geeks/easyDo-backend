"use strict";

module.exports = (req, res, next) => {
  try {
    console.log("Bearer Auth Middleware");
    next();
  } catch (error) {
    console.log("Bearer Auth Middleware error");
  }
};
