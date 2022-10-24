"use strict";

const supertest = require("supertest");
const server = require("../server");
const { customerModel } = require("../models");
const create = require("../collections/collections");
const { getCustomer } = require("../routes/customer.route");
const request = supertest(server.app);

const customerUser = customerModel.findOne({ where: { username: "customer" } });

// test the customer route

// describe("customer route", () => {
//     it("Testing new ", () => {
//         const req = { id: 1};
//         const data = getCustomer(req);
//         console.log(data);
//     })
// })
describe("customer route", () => {
  it("test customer signup route", async () => {
    const checkExist = await customerModel.findOne({
      Where: { username: "customer" },
    });
    if (!customerUser) {
      const response = await request.post("/customer/signup").send({
        username: "customer",
        email: "customer@customer.com",
        password: "customer",
        role: "customer",
      });
      expect(response.body.username).toEqual("customer");
      expect(response.body.email).toEqual("customer@customer.com");
      expect(response.body.password).toEqual("customer");
      expect(response.body.role).toEqual("customer");
      expect(response.status).toEqual(201);
    } else {
      const response = await request.post("/customer/signin").send({
        username: "customer",
        password: "customer",
      });
      expect(response.status).toEqual(200);
    }
  });

  it("test customer signin route", async () => {
    if (!customerUser) {
      const response = await request.post("/customer/signin").send({
        username: "customer",
        password: "customer",
      });
      expect(response.body.username).toEqual("customer");
      expect(response.body.password).toEqual("customer");
      expect(response.status).toEqual(200);
    }
  });

  it('test get customer by id route', async () => {
     if(!customerUser){
        customer = create('customer', {username: 'customer', password: 'customer', email: 'customer@customer.com'});
        let token = customer.generateToken({username: 'customer', password: 'customer', email: 'customer@customer.com'});
        const response = await request.get('/customer/1').set('Authorization', `Bearer ${token}`);
        expect(response.body.username).toEqual('customer');
        expect(response.body.password).toEqual('customer');
        expect(response.body.email).toEqual('customer@customer.com');
        expect(response.status).toEqual(200);
      } 
    });

    it('test update customer by id route', async () => {
      if(!customerUser){
        customer = create('customer', {username: 'customer', password: 'customer', email: 'customer@customer.com'});
        let token = customer.generateToken({username: 'customer', password: 'customer', email: 'customer@customer.com'});
        const response = await request.put('/customer/1').set('Authorization', `Bearer ${token}`).send({
            username: 'customer1',
            password: 'customer',
            email: 'customer@customer.com'
        });
        expect(response.body.username).toEqual('customer1');
        expect(response.body.password).toEqual('customer');
        expect(response.body.email).toEqual('customer@customer.com');
        expect(response.status).toEqual(200);
      } 
    });

    it('test delete customer by id route', async () => {
       if(!customerUser){
        customer = create('customer', {username: 'customer', password: 'customer', email: 'customer@customer.com'});
        let token = customer.generateToken({username: 'customer', password: 'customer', email: 'customer@customer.com'});
        const response = await request.delete('/customer/1').set('Authorization', `Bearer ${token}`);
        expect(response.body.username).toEqual('customer');
        expect(response.body.password).toEqual('customer');
        expect(response.body.email).toEqual('customer@customer.com');
        expect(response.status).toEqual(202);
       }
    });
});
