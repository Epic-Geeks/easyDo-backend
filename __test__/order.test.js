'use strict';

const supertest = require('supertest');
const server = require('../server');
const { orderModel } = require('../models');
const create = require('../collections/collections');
const request = supertest(server.app);


const order = orderModel.findOne({ where: { id: 1 } });

   describe('Order route', () => {
   it('test create new order route', async () => {
         if(!order){
         const response = await request.post('/order').send({
               customerID: 1,
               providerID: 1,
               serviceID: 1,
               order_date: '2022-10-24',
         });
            expect(response.body.customerID).toEqual(1);
            expect(response.body.providerID).toEqual(1);
            expect(response.body.serviceID).toEqual(1);
            expect(response.body.order_date).toEqual('2022-10-24');
         }
      });
   
   it('test get all orders route', async () => {
      if(!order){
            order = create('order', { customer_id: 1, provider_id: 1, service_id: 1, order_status: 'pending', rateService: 4.0, order_date: '2022-10-24' });
            const response = await request.get('/orders');
            expect(response.body.customerID).toEqual(1);
            expect(response.body.providerID).toEqual(1);
            expect(response.body.serviceID).toEqual(1);
            expect(response.body[0].order_status).toEqual('pending');
            expect(response.body[0].rateService).toEqual(4.0);
            expect(response.body[0].order_date).toEqual('2022-10-24');
            }
      
      });


   it('test get order by id', async () => {
         if(!order){
         const response = await request.get('/order/1');
         expect(response.body).toEqual(response);
         }
      });

   it('test update orderStatus ', async () => {
         if(!order){
         const response = await request.put('/order/1').send({
               order_status: 'done'
         });
            expect(response.body.order_status).toEqual('done');
         }
      });
   
   it('test delete order', async () => { 
         if(!order){
         const response = await request.delete('/order/1');
         expect(response.body.destroyed).toEqual(true);
         }
      });


}); 