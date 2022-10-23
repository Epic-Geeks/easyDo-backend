const supertest = require('supertest');
const server = require('../server');
const { serviceModel } = require('../models');
const create = require('../collections/collections');
const request = supertest(server.app);

const service = serviceModel.findOne({ where: { serviceDescription: 'service', servicePrice: 100, serviceCategory:  "painter", providerID: 1 } });

describe('service routes', () => {

    it ('test create service', async () => {
        if (!service) {
            service = create('service', { serviceDescription: 'service', servicePrice: 100, serviceCategory:  "painter", providerID: 1 });
            const response = await request.post('/service').send(service);
            expect(response.status).toEqual(201)
        }
    });

    it ('get all services', async () => {
        if (!service) {
            service = create('service', { serviceDescription: 'service', servicePrice: 100, serviceCategory:  "painter", providerID: 1 });
            const response = await request.get('/services');
            expect(response.status).toEqual(200)
        }
    });

    it ('get service by id', async () => {
        if (!service) {
            service = create('service', { serviceDescription: 'service', servicePrice: 100, serviceCategory:  "painter", providerID: 1 });
            const response = await request.get('/service/1');
            expect(response.status).toEqual(200)
        }
    });

    it ('update service', async () => {
        if (!service) {
            service = create('service', { serviceDescription: 'service', servicePrice: 100, serviceCategory:  "painter", providerID: 1 });
            const response = await request.put('/service/1').send(service);
            expect(response.status).toEqual(200)
        }
    });

    it ('delete service', async () => {
        if (!service) {
            service = create('service', { serviceDescription: 'service', servicePrice: 100, serviceCategory:  "painter", providerID: 1 });
            const response = await request.delete('/service/1');
            expect(response.status).toEqual(202)
        }
    });
});
