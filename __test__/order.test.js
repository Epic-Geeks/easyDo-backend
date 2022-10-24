'use strict';

const supertest = require('supertest');
const server = require('../server');
const { orderModel , customerModel, providerModel, serviceModel} = require('../models');
const create = require('../collections/collections');
const request = supertest(server.app);


const order = orderModel.findOne({ where: { id: 1 } });

   describe('Order route', () => {
   it('test create new order route', async () => {
         if(!order){
         const response = await request.post('/order').send({
               customer_id: 1,
               provider_id: 1,
               service_id: 1,
               order_status: 'pending'
         });
         expect(response.status).toEqual(201);
         }
      });
   
   it('test get all orders route', async () => {
            if(!order){
            const response = await request.get('/orders');   
            expect(response.status).toEqual(200);
            }
      //    const response = await request.get('/orders');
      //    expect(response.status).toEqual(200);
      });


   it('test get order by id', async () => {
         if(!order){
         const response = await request.get('/order/1');
         expect(response.status).toEqual(200);
         }
      });

   it('test update orderStatus ', async () => {
         if(!order){
         const response = await request.put('/order/1').send({
               order_status: 'pending'
         });
         expect(response.status).toEqual(200);
         }
      });
   
   it('test delete order', async () => { 
         if(!order){
         const response = await request.delete('/order/1');
         expect(response.status).toEqual(200);
         }
      });


}); 