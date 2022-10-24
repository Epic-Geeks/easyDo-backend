"use strict";

const { Provider, serviceModel, orderModel } = require("../models");

const errorObj = (error) => {
  return {
    message: error,
    status: 500,
  };
};

async function getProvider(req, res, next) {
  try {
    let requestedProvider = await Provider.getProvider(
      req.params.id,
      serviceModel,
      orderModel
    );
    res.status(200).json(requestedProvider);
  } catch (error) {
    console.log(error);
    next(errorObj(error));
  }
}

async function updateProvider(req, res, next) {
  try {
    if (req.files && req.files.length > 0) {
      req.body.picture = req.files.map(
        (file) => `${process.env.BACKEND_URL}/${file.filename}`
      );
    }
    let requestedProvider = await Provider.updateProvider(
      req.params.id,
      req.body,
      serviceModel
    );
    res.status(200).json(requestedProvider);
  } catch (error) {
    console.log(error);
    next(errorObj(error));
  }
}

async function holdServices(req, res) {
  try {
    let deletedProvider = await Provider.holdServices(
      req.params.id,
      serviceModel
    );
    res.status(202).json(deletedProvider);
  } catch (error) {
    console.log(error);
    next(errorObj(error));
  }
}

module.exports = {
  getProvider,
  updateProvider,
  holdServices,
};
