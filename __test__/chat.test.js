'use strict';

const supertest = require('supertest');
const server = require('../server');
const { chatModel } = require('../models');
const request = supertest(server.app);

const chat = chatModel.findOne({ where: { id: 1 } });

describe('Chat route', () => {
    it('test create new chat route', async () => {
        if(!chat){
        const response = await request.post('/chat').send({
            customerID: 1,
            providerID: 1,
            ChatMessages: 'hello'
        });
        expect(response.body.customerID).toEqual(1);
        expect(response.body.providerID).toEqual(1);
        expect(response.body.ChatMessages).toEqual('hello');
        }
     });

    it('test get chat by id', async () => {
        if(!chat){
        const response = await request.get('/chat/1/1');
        expect(response.body.customerID).toEqual(1);
        expect(response.body.providerID).toEqual(1);
    }
     });

    it('test update chat message', async () => {
        if(!chat){
        const response = await request.put('/chat/1/1').send({
            ChatMessages: 'hello'
        });
        expect(response.body.ChatMessages).toEqual('hello');   
    }
     });
    
    it('test delete chat', async () => { 
        if(!chat){
        const response = await request.delete('/chat/1');
        expect(response.body.destroyed).toEqual(true);
        }
     });

});