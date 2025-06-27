// API tests for endpoints
const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Task = require('../models/Task');

jest.setTimeout(20000); // Increase timeout for DB connection

beforeAll(async () => {
  process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/tasks_api_test';
  // No need to call mongoose.connect here, server.js does it
});

afterAll(async () => {
  await Task.deleteMany({}); // Clean up tasks
  await mongoose.connection.close();
});

describe('API Endpoint Tests', () => {
  let taskId;

  beforeEach(async () => {
    const task = new Task({ title: 'API Test', completed: false });
    await task.save();
    taskId = task._id.toString();
  });

  afterEach(async () => {
    await Task.deleteMany({});
  });

  test('POST /api/tasks creates a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'API Test 2', completed: false });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('API Test 2');
    expect(res.body.completed).toBe(false);
  });

  test('GET /api/tasks returns tasks', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.find(t => t._id === taskId)).toBeDefined();
  });

  test('PUT /api/tasks/:id updates a task', async () => {
    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .send({ completed: true });
    expect(res.statusCode).toBe(200);
    expect(res.body.completed).toBe(true);
  });

  test('PUT /api/tasks/:id with no fields returns 400', async () => {
    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .send({});
    expect(res.statusCode).toBe(400);
  });

  test('DELETE /api/tasks/:id deletes a task', async () => {
    const res = await request(app).delete(`/api/tasks/${taskId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Task deleted');
  });

  test('GET /api/tasks after delete does not include deleted task', async () => {
    await request(app).delete(`/api/tasks/${taskId}`);
    const res = await request(app).get('/api/tasks');
    expect(res.body.find(t => t._id === taskId)).toBeUndefined();
  });
});
