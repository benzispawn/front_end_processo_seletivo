const request = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe('Veiculo API', () => {
    it('criar novo veículo', async () => {
        const res = await request(app)
            .post('/api/veiculos')
            .send({
                placa: 'ABC1234',
                chassi: 'XYZ5678',
                renavam: '123456789',
                modelo: 'Sedan',
                marca: 'Toyota',
                ano: 2020
            });

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('id');
    });
    it('pegar todos os veiculos', async () => {
        const res = await request(app).get('/api/veiculos');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    });

    it('pegar veiculo com id específico', async () => {
        const res = await request(app).get('/api/veiculos/1');
        expect(res.status).to.be.oneOf([200, 404]);

        const res2 = await request(app).get('/api/veiculos/999');
        expect(res2.status).to.be.oneOf([200, 404]);
    });

    it('update no veiculo com id específico', async () => {
        const res = await request(app)
            .put('/api/veiculos/1')
            .send({
                modelo: 'Sedan',
            });

        expect(res.status).to.be.oneOf([200, 404]);

        const res2 = await request(app)
            .put('/api/veiculos/999')
            .send({
                modelo: 'Sedan',
            });

        expect(res2.status).to.be.oneOf([200, 404]);
    });

    it('deletar um veiculo específico', async () => {
        const res = await request(app).delete('/api/veiculos/1');
        expect(res.status).to.be.oneOf([204, 404]);

        const res2 = await request(app).delete('/api/veiculos/1');
        expect(res2.status).to.be.oneOf([204, 404, 500]);
    })
})