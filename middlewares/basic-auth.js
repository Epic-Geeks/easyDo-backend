"use strict";

module.exports = (req, res, next) => {
  try {
    console.log("Basic Auth Middleware");
    next();
  } catch (error) {
    console.log("Basic Auth Middleware error");
  }
};
