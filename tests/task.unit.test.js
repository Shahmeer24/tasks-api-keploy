// Unit tests for Task model logic
const Task = require('../models/Task');

describe('Task Model Unit Tests', () => {
  test('should create a Task instance', () => {
    const task = new Task({ title: 'Test', completed: false });
    expect(task.title).toBe('Test');
    expect(task.completed).toBe(false);
  });

  test('should default completed to false', () => {
    const task = new Task({ title: 'Default Complete' });
    expect(task.completed).toBe(false);
  });

  test('should require a title', () => {
    const task = new Task({});
    const err = task.validateSync();
    expect(err.errors.title).toBeDefined();
  });

  test('should not allow empty title', () => {
    const task = new Task({ title: '' });
    const err = task.validateSync();
    expect(err.errors.title).toBeDefined();
  });

  test('should allow completed true', () => {
    const task = new Task({ title: 'Done', completed: true });
    expect(task.completed).toBe(true);
  });
});
