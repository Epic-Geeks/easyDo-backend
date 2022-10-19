"use strict";

module.exports = (err, req, res, next) => {
  return res.status(404).send({
    code: 404,
    message: `Page Not Found`,
  });
};
