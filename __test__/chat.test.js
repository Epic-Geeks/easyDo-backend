'use strict';

const supertest = require('supertest');
const server = require('../server');
const { chatModel } = require('../models');
const create = require('../collections/collections');
const request = supertest(server.app);

const chat = chatModel.findOne({ where: { id: 1 } });

describe('Chat route', () => {
    it('test create new chat route', async () => {
        if(!chat){
        const response = await request.post('/chat').send({
            customer_id: 1,
            provider_id: 1,
            message: 'hello'
        });
        expect(response.status).toEqual(201);
        }
     });

    it('test get chat by id', async () => {
        if(!chat){
        const response = await request.get('/chat/1/1');
        expect(response.status).toEqual(200);
        }
     });

    it('test update chat message', async () => {
        if(!chat){
        const response = await request.put('/chat/1/1').send({
            message: 'hello'
        });
        expect(response.status).toEqual(200);
        }
     });
    
    it('test delete chat', async () => { 
        if(!chat){
        const response = await request.delete('/chat/1');
        expect(response.status).toEqual(200);
        }
     });

});