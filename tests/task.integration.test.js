// Integration tests for Task API and DB
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

describe('Task API Integration Tests', () => {
  let createdTaskId;

  beforeEach(async () => {
    const task = new Task({ title: 'Integration Test Task' });
    await task.save();
    createdTaskId = task._id.toString();
  });

  afterEach(async () => {
    await Task.deleteMany({});
  });

  test('POST /api/tasks should create a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Integration Test Task 2' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Integration Test Task 2');
    expect(res.body.completed).toBe(false);
  });

  test('GET /api/tasks should return all tasks', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('PUT /api/tasks/:id should update a task', async () => {
    const res = await request(app)
      .put(`/api/tasks/${createdTaskId}`)
      .send({ completed: true });
    expect(res.statusCode).toBe(200);
    expect(res.body.completed).toBe(true);
  });

  test('PUT /api/tasks/:id with invalid id should return 404', async () => {
    const res = await request(app)
      .put('/api/tasks/000000000000000000000000')
      .send({ completed: true });
    expect(res.statusCode).toBe(404);
  });

  test('DELETE /api/tasks/:id should delete a task', async () => {
    const res = await request(app).delete(`/api/tasks/${createdTaskId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Task deleted');
  });

  test('DELETE /api/tasks/:id with invalid id should return 404', async () => {
    const res = await request(app).delete('/api/tasks/000000000000000000000000');
    expect(res.statusCode).toBe(404);
  });
});
