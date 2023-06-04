const request = require('supertest');
const express = require('express');
const app = express();

const { allBodyParts, getBodyPartsById } = require('../controllers/bodypart'); // Sesuaikan dengan path dan nama file Controller Anda

// Endpoint untuk allBodyParts
app.get('/api/bodyparts', allBodyParts);

// Endpoint untuk getBodyPartsById
app.get('/api/bodyparts/:id', getBodyPartsById);

describe('Testing API Endpoints', () => {
  // Test untuk endpoint allBodyParts
  describe('GET /api/bodyparts', () => {
    it('should get all body parts', async () => {
      const response = await request(app).get('/api/bodyparts');
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it('should get body parts by target', async () => {
      const target = 'abs';
      const response = await request(app).get(`/api/bodyparts?target=${target}`);
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });
  });

  // Test untuk endpoint getBodyPartsById
  describe('GET /api/bodyparts/:id', () => {
    it('should get body part by id', async () => {
      const id = '0001';
      const response = await request(app).get(`/api/bodyparts/${id}`);
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it('should return 404 if exercise is not found', async () => {
      const id = '99999';
      const response = await request(app).get(`/api/bodyparts/${id}`);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Exercise is not found');
    });
  });
});
