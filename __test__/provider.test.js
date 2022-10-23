'use strict';

const supertest = require('supertest');
const server = require('../server');
const { providerModel } = require('../models');
const create = require('../collections/collections');
const request = supertest(server.app);

const providerUser = providerModel.findOne({ where: { username: 'provider', email: 'provider@provider.com' } });


describe('provider routes', () => {
    it('test provider signup', async () => {
        if (!providerUser) {
            provider = create('provider', { username: 'provider', password: 'provider', email: 'provider@provider.com' });
            let token = provider.generateToken({ username: 'provider', password: 'provider', email: 'provider@provider.com' });
            const response = await request.post('/provider/signup').set('Authorization', `Bearer ${token}`);
            expect(response.status).toEqual(201)
        }
    });

    it('test provider signin', async () => {
        if (!providerUser) {
            provider = create('provider', { username: 'provider', password: 'provider', email: 'provider@provider.com' });
            let token = provider.generateToken({ username: 'provider', password: 'provider', email: 'provider@provider.com'});
            const response = await request.post('/provider/signin').set('Authorization', `Bearer ${token}`);
            expect(response.status).toEqual(200)
        }
    });

    it ('test get provider by id', async () => {
        if (!providerUser) {
            provider = create('provider', { username: 'provider', password: 'provider', email: 'provider@provider.com' });
            let token = provider.generateToken({ username: 'provider', password: 'provider', email: 'provider@provider.com' });
            const response = await request.get('/provider/1').set('Authorization', `Bearer ${token}`);
            expect(response.status).toEqual(200)
        }});

    it ('test update provider', async () => {
        if (!providerUser) {
            provider = create('provider', { username: 'provider', password: 'provider', email: 'provider@provider.com' });
            let token = provider.generateToken({ username: 'provider', password: 'provider', email: 'provider@provider.com' });
            const response = await request.put('/provider/1').set('Authorization', `Bearer ${token}`);
            expect(response.status).toEqual(200)
        }});

    it ('test delete provider', async () => {
        if (!providerUser) {
            provider = create('provider', { username: 'provider', password: 'provider', email: 'provider@provider.com' });
            let token = provider.generateToken({ username: 'provider', password: 'provider', email: 'provider@provider.com' });
            const response = await request.delete('/provider/1').set('Authorization', `Bearer ${token}`);
            expect(response.status).toEqual(202)
        }});

            
});
