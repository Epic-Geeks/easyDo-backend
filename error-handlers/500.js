"use strict";

const models = require("../models/index");
/*eslint-disable no-unused-vars*/
module.exports = async (req, res, next) => {
  const id = req.params.id;
  if (isNaN(+id)) {
    return res.status(403).send(`${id} is not a valid ID`);
  }
  let reqURL = req.url.toLowerCase();
  let requested = reqURL.split("/")[1];
  let model = models[`${requested}Model`];

  const requestedItem = await model.findOne({ where: { id: id } });

  console.log("mode", requestedItem);

  if (!requestedItem) {
    return res.status(404).send(`${requested} not found`);
  } else {
    return next();
  }
};
