async function fetchTasks() {
  const response = await fetch("/api/tasks");
  const tasks = await response.json();
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <i class="fa-solid ${task.completed ? "fa-check icon-check" : "fa-bookmark icon-bookmark"}" onclick="toggleIcon(this, '${task._id}', ${!task.completed})"></i>
      <span class="task-title">${task.title}</span>
      <div class="btn-container">
        <button class="btn-edit" onclick="showEditForm('${task._id}', '${task.title}')">Edit</button>
        <button class="btn-toggle" onclick="toggleTask('${task._id}', ${!task.completed})">Toggle</button>
        <button class="btn-delete" onclick="deleteTask('${task._id}')">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

async function addTask() {
  const title = document.getElementById("taskInput").value;
  if (!title) return alert("Please enter a task");
  await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  document.getElementById("taskInput").value = "";
  fetchTasks();
}

function showEditForm(id, currentTitle) {
  const li = event.target.parentElement;
  li.innerHTML = `
    <div class="edit-input">
      <input type="text" value="${currentTitle}" id="editInput-${id}">
      <div class="btn-container">
        <button onclick="updateTask('${id}')">Save</button>
        <button class="btn-delete" onclick="fetchTasks()">Cancel</button>
      </div>
    </div>
  `;
}

async function updateTask(id) {
  const title = document.getElementById(`editInput-${id}`).value;
  if (!title) return alert("Task title cannot be empty");
  await fetch(`/api/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  fetchTasks();
}

async function toggleTask(id, completed) {
  await fetch(`/api/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
  fetchTasks();
}

async function toggleIcon(icon, id, completed) {
  if (icon.classList.contains("fa-bookmark")) {
    icon.classList.remove("fa-bookmark");
    icon.classList.add("fa-check");
  } else {
    icon.classList.remove("fa-check");
    icon.classList.add("fa-bookmark");
  }
  await toggleTask(id, completed);
}

async function deleteTask(id) {
  await fetch(`/api/tasks/${id}`, { method: "DELETE" });
  fetchTasks();
}

fetchTasks();