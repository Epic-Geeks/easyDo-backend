"use strict";

module.exports = (req, res, next) => {
  try {
    
    next();
  } catch (error) {
    console.log("ACL Middleware error");
  }
};
