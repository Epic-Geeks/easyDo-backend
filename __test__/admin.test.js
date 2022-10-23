'use strict';

const supertest = require('supertest');
const server = require('../server');
const { adminModel } = require('../models');
const create = require('../collections/collections');
const admin = require('../routes/admin.route');
const request = supertest(server.app);

const adminUser = adminModel.findOne({ where: { username: 'admin' } });

describe('server is running', () => {
    it('test home route', async () => {
        const response = await request.get('/');
        expect(response.status).toEqual(200);
        expect(response.text).toEqual('Hello World');
    });
    it('test bad route', async () => {
        const response = await request.get('/bad');
        expect(response.status).toEqual(403);
    });
    
});

describe('admin route', () => {
    it('test admin route', async () => {
        const response = await request.get('/admin');
        expect(response.status).toEqual(200);
        expect(response.text).toEqual('Hello Admin');
    });
    
    it('test admin signup route', async () => {
       if(!adminUser){
        const response = await request.post('/admin/signup').send({
            username: 'admin',
            password: 'admin',
            email: 'admin@admin.com',
            role: 'admin'
        });
        expect(response.status).toEqual(201);
        expect(response.body.username).toEqual('admin');
       }
    });
    
    it('test admin signin route', async () => {
        const response = await request.post('/admin/signin').send({
            username: 'admin',
            password: 'admin'
        });
        expect(response.status).toEqual(200);
    });
    it('test get all admins route', async () => {
        const response = await request.get('/admin');
        expect(response.status).toEqual(200);
    });
    
    it('test get admin by id route', async () => {
        if(!adminUser){
            admin = create('admin', {username: 'admin', password: 'admin', email: 'admin@admin.com'});
            let token = admin.generateToken({username: 'admin', password: 'admin', email: 'admin@admin.com'});
            const response = await request.get('/admin/1').set('Authorization', `Bearer ${token}`);
            expect(response.status).toEqual(200);
        }
    });
    it('test update admin route', async () => {
        if(!adminUser){
            admin = create('admin', {username: 'admin', password: 'admin', email: 'admin@admin.com'});
            let token = admin.generateToken({username: 'admin', password: 'admin', email: 'admin@admin.com'});
            const response = await request.put('/admin/1').send({
                username: 'admin1',
                password: 'admin'
            }).set('Authorization', `Bearer ${token}`);
            expect(response.status).toEqual(200);
        }
    });
    it('test delete admin route', async () => {
        if(!adminUser){
            admin = create('admin', {username: 'admin', password: 'admin', email: 'admin@admin.com'});
            let token = admin.generateToken({username: 'admin', password: 'admin', email: 'admin@admin.com'});
            const response = await request.delete('/suspendAdmin/1').set('Authorization', `Bearer ${token}`);
            expect(response.status).toEqual(202);
        }
    });
    it('test admin getting all customers', async () => {
        if(!adminUser){
            admin = create('admin', {username: 'admin', password: 'admin', email: 'admin@admin.com'});
            let token = admin.generateToken({username: 'admin', password: 'admin', email: 'admin@admin.com'});
            const response = await request.get('/customer').set('Authorization', `Bearer ${token}`);
            expect(response.status).toEqual(200);
        }
    });

    it('test admin suspend customer', async () => { 
        if(!adminUser){
        admin = create('admin', {username: 'admin', password: 'admin', email: 'admin@admin.com'});
        let token = admin.generateToken({username: 'admin', password: 'admin', email: 'admin@admin.com'});
        const response = await request.delete('/susCustomer/1').set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(202);
        }
    });

    it('test admin getting all providers', async () => {
        if(!adminUser){
            admin = create('admin', {username: 'admin', password: 'admin', email: 'admin@admin.com'});
            let token = admin.generateToken({username: 'admin', password: 'admin', email: 'admin@admin.com'});
            const response = await request.get('/provider').set('Authorization', `Bearer ${token}`);
            expect(response.status).toEqual(200);
        }
    });

    it('test admin suspend provider', async () => {
        if(!adminUser){
            admin = create('admin', {username: 'admin', password: 'admin', email: 'admin@admin.com'});
            let token = admin.generateToken({username: 'admin', password: 'admin', email: 'admin@admin.com'});
            const response = await request.delete('/providerSus/1').set('Authorization', `Bearer ${token}`); 
            expect(response.status).toEqual(202);
        }
    });
});



