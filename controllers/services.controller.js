"use strict";

const { Service, providerModel, orderModel } = require("../models");

const errorObj = (error) => {
  return {
    message: error,
    status: 500,
  };
};
async function updateService(req, res, next) {
  try {
    if (req.files) {
      req.body.picture = req.files.map(
        (file) => `${process.env.BACKEND_URL}/${file.filename}`
      );
    }
    const service = await Service.updateService(req.params.id, req.body);
    res.status(200).json(service);
  } catch (error) {
    console.log(error);
    next(errorObj(error));
  }
}

async function getAllServices(req, res, next) {
  try {
    let allServices = await Service.getAllServices(providerModel, orderModel);
    res.status(200).json(allServices);
  } catch (error) {
    console.log(error);
    next(errorObj(error));
  }
}

async function createNewService(req, res, next) {
  try {
    if (req.userInfo.suspend) {
      next({
        message: "you are suspended, please contact the admin",
        status: 403,
      })
    }
    if (req.files) {
      req.body.picture = await req.files.map(
        (file) => `${process.env.BACKEND_URL}/${file.filename}`
      );
    }
    req.body.providerID = req.userInfo.id;
    const obj = req.body;
    let newService = await Service.create(obj);
    // console.log(newService);
    res.status(201).json(newService);
  } catch (error) {
    console.log(error);
    next(errorObj(error));
  }
}

async function getService(req, res) {
  try {
    let requestedService = await Service.getService(
      req.params.id,
      providerModel,
      orderModel
    );
    res.status(200).json(requestedService);
  } catch (error) {
    console.log(error);
    next(errorObj(error));
  }
}

async function deleteService(req, res) {
  try {
    let deletedService = await Service.hideService(
      req.params.id,
      providerModel
    );
    res.status(202).json(deletedService);
  } catch (error) {
    console.log(error);
    next(errorObj(error));
  }
}

module.exports = {
  updateService,
  getAllServices,
  createNewService,
  getService,
  deleteService,
};
