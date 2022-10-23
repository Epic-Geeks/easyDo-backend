'use strict';

const supertest = require('supertest');
const server = require('../server');
const { customerModel } = require('../models');
const create = require('../collections/collections');
const request = supertest(server.app);

const customerUser = customerModel.findOne({ where: { username: 'customer' } });


// test the customer route
describe('customer route', () => {

    it('test customer signup route', async () => {
        setTimeout( () => {
            const response = request.post('/customer/signup').send({
                username: 'customer',
                password: 'customer',
                role: 'customer',
            });
            expect(response.status).toEqual(200);
        })
    });
    it('test customer signin route', async () => {
        setTimeout( () => {
            const response = request.post('/customer/signin').send({
                username: 'customer',
                password: 'customer'
            });
            expect(response.status).toEqual(200);
         });

    });
    // it('test get all customers route', async () => {
    //     const response = await request.get('/customer');
    //     expect(response.status).toEqual(200);
    // });
    
    it('test get customer by id route', async () => {
        if(!customerUser){
            customer = create('customer', {username: 'customer', password: 'customer', email: 'customer@customer.com'});
            let token = customer.generateToken({username: 'customer', password: 'customer', email: 'customer@customer.com'});
            const response = await request.get('/customer/1').set('Authorization', `Bearer ${token}`);
            expect(response.status).toEqual(200);
        } 
        // else {
        //     let token = customerUser.generateToken({username: 'customer', password: 'customer', email: 'customer@customer.com'});
        //     const response = await request.get('/customer/1').set('Authorization', `Bearer ${token}`);
        //     expect(response.status).toEqual(200);
        // }
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
            expect(response.status).toEqual(200);
        } 
        // else {
        //     let token = customerUser.generateToken({username: 'customer', password: 'customer', email: 'customer@customer.com'});
        //     const response = await request.put('/customer/1').set('Authorization', `Bearer ${token}`).send({
        //         username: 'customer1',
        //         password: 'customer',
        //         email: 'customer@customer.com'
        //     });
        //     expect(response.status).toEqual(200);
        // }
    });

    it('test delete customer by id route', async () => {
        if(!customerUser){
            customer = create('customer', {username: 'customer', password: 'customer', email: 'customer@customer.com'});
            let token = customer.generateToken({username: 'customer', password: 'customer', email: 'customer@customer.com'});
            const response = await request.delete('/customer/1').set('Authorization', `Bearer ${token}`);
            expect(response.status).toEqual(202);
        
        }
        // else {
        //     let token = customer.generateToken({username: 'customer', password: 'customer', email: 'customer@customer.com'});
        //     const response = await request.delete('/customer/1').set('Authorization', `Bearer ${token}`);
        //     expect(response.status).toEqual(202);
        // }
    });
});

