"use strict";

const { Order, orderModel, serviceModel, Provider } = require("../models");

const errorObj = (error) => {
  return {
    message: error.message,
    status: 500,
  };
};

async function checkDate(req, res, next) {
  try {
    const day = req.body.orderDate;
    const serviceID = req.body.serviceID;
    const service = await serviceModel.findOne({ where: { id: serviceID } });
    req.body.providerID = service.providerID;  
    let requestedProvider = await Provider.getProvider(
      req.body.providerID,
      serviceModel,
      orderModel
    );
    let ordersRequests = requestedProvider.Orders.map((order) => {
      //  return JSON.stringify(order.dataValues.createdAt).split("T")[0].slice(1);
      return order.dataValues.orderDate;
    });

    const a = ordersRequests.filter((days) => {
      return days === day;
    });
    console.log(a);
    if (a.length >= 5) {
      return next({
        message: "the day is full",
        status: 409,
      });
    }
    return next();
  } catch (error) {
    next(errorObj(error));
  }
}

async function createNewOrder(req, res, next) {
  try {
    req.body.customerID = req.userInfo.id;
    const obj = req.body;
    let newOrder = await Order.create(obj);
    req.orderDetails = newOrder;
    return next();
  } catch (error) {
    console.log(error);
    next(errorObj(error));
  }
}

async function getAllOrders(req, res) {
  try {
    let allOrders = await Order.getAll();
    res.status(200).json(allOrders);
  } catch (error) {
    console.log(error);
    next(errorObj(error));
  }
}

async function getOrder(req, res) {
  try {
    let requestedOrder = await Order.getById(req.params.id);
    res.status(200).json(requestedOrder);
  } catch (error) {
    console.log(error);
    next(errorObj(error));
  }
}

async function updateCondition(req, res, next) {
  try {
    let requestedOrder = await Order.updateOrderStatus(
      req.params.id,
      req.params.condition,
      req.body.rateService,
      req.body.reviewComment
    );

    if (req.params.condition == "done") {
      let id = req.params.id;
      let order = await orderModel.findOne({ where: { id } });
      let service = await serviceModel.findOne({
        where: { id: order.serviceID },
      });
      let doneOrders = await orderModel.findAll({
        where: { serviceID: service.id, status: "done" },
      });
      let sum = 0,
        length = 0;
      doneOrders.forEach((a) => {
        (sum += a.rateService), (length += 1);
      });
      await service.update({
        averageRate: Math.floor((sum / length) * 100) / 100,
      });
      return res.status(200).json(requestedOrder);
    }
    return res.status(200).json(requestedOrder);
  } catch (error) {
    console.log(error);
    next(errorObj(error));
  }
}

async function deleteOrder(req, res) {
  try {
    let deletedOrder = await Order.hide(req.params.id);
    res.status(202).json(deletedOrder);
  } catch (error) {
    console.log(error);
    next(errorObj(error));
  }
}

module.exports = {
  checkDate,
  createNewOrder,
  getAllOrders,
  getOrder,
  updateCondition,
  deleteOrder,
};
