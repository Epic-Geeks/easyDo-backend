"use strict";

const { 
 orderModel,
 customerModel,
 serviceModel,
 adminModel,
 providerModel,
} = require("../models/index");
const models = require("../models/index");
/*eslint-disable no-unused-vars*/
module.exports = async (req, res, next) => {
 const id = req.params.id;
console.log( req.url.toLowerCase() );
console.log( models );
next();


 /* const order = await orderModel.findOne({ where: { id: id } });
 if (!order) {
  next("order not found");
 } else {
/*   req.order = order;
   return next(); }*/

 

 /* const customer = await customerModel.findOne({ where: { id: id } });
 if (!customer) {
  return res.send( "customer not found" );
 } else {
 req.customer = customer; 
  return next();
 }  */

 /* const service = await serviceModel.findOne({ where: { id: id } });
 if (!service) {
  next("service not found");
 } else {
  req.service = service;
  return next();
}

 const admin = await adminModel.findOne({ where: { id: id } });
 if (!admin) {
  next("admin not found");
 } else {
  req.admin = admin;
  return next();
}

 const provider = await providerModel.findOne({ where: { id: id } });
 if (!provider) {
  next("provider not found");
 } else {
  req.provider = provider;
  return next();
} */


};
