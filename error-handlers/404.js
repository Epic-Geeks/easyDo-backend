"use strict";

module.exports = (err, req, res, next) => {
  return res.status(err.status || 404).send({
    code: err.status || 404,
    message: err.message || "Not Found..!",
  });
};
