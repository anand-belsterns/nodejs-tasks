const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
  it('should respond with a 200 status', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
});