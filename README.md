# Task Manager

A simple full-stack web application for managing tasks, built with Node.js, Express, MongoDB, and a minimal frontend using vanilla JavaScript, HTML, and CSS.

---

## Features

- Add new tasks with a title.
- View a list of all tasks.
- Mark tasks as completed or not completed (toggle).
- Edit the title of existing tasks.
- Delete tasks.
---

## API Overview

### API Endpoints

- **GET `/api/tasks`**  
  Retrieve all tasks.  
  **Response:**  
  ```json
  [
    {
      "_id": "60f7c2e5b4d1c2a5f8e8b456",
      "title": "Sample Task",
      "completed": false
    }
  ]
  ```

- **POST `/api/tasks`**  
  Create a new task.  
  **Request Body:**  
  ```json
  { "title": "New Task" }
  ```
  **Response:**  
  ```json
  {
    "_id": "60f7c2e5b4d1c2a5f8e8b457",
    "title": "New Task",
    "completed": false
  }
  ```

- **PUT `/api/tasks/:id`**  
  Update a task's title or completion status.  
  **Request Body:**  
  ```json
  { "title": "Updated Title" }
  ```
  or  
  ```json
  { "completed": true }
  ```
  **Response:**  
  ```json
  {
    "_id": "60f7c2e5b4d1c2a5f8e8b457",
    "title": "Updated Title",
    "completed": true
  }
  ```

- **DELETE `/api/tasks/:id`**  
  Delete a task by its ID.  
  **Response:**  
  ```json
  { "message": "Task deleted" }
  ```

---

## Database

- **Database Used:** MongoDB
- **Integration:**  
  The server uses [Mongoose](https://mongoosejs.com/) to define a schema and interact with MongoDB.  
  Each task document contains:
  - `title` (string, required)
  - `completed` (boolean, default: false)

  Example schema (`models/Task.js`):
  ```javascript
  const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false }
  });
  ```

---

## How to Run the Server

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shahmeer24/tasks-api-keploy
   cd tasks-api-keploy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   - Create a `.env` file in the root directory.
   - Add your MongoDB connection string:
     ```
     MONGODB_URI=mongodb://localhost:27017/tasksdb
     PORT=3000
     ```

4. **Start the server**
   ```bash
   npm start
   ```

---

## How to Run the Frontend Locally

The frontend is served automatically by the Express server.  
After starting the server, open your browser and go to:

```
http://localhost:3000
```

---

## How to Interact with the API

You can use tools like [Postman](https://www.postman.com/) or `curl` to interact with the API.

**Example: Create a Task**
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy groceries"}'
```

**Example: Get All Tasks**
```bash
curl http://localhost:3000/api/tasks
```

**Example: Update a Task**
```bash
curl -X PUT http://localhost:3000/api/tasks/<task_id> \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
```

**Example: Delete a Task**
```bash
curl -X DELETE http://localhost:3000/api/tasks/<task_id>
```

---

## File Structure

- `/models/Task.js` - Mongoose schema for tasks.
- `/public/index.html` - Main frontend HTML.
- `/public/script.js` - Frontend JavaScript for UI and API calls.
- `/public/styling.css` - Styles for the frontend.

---
