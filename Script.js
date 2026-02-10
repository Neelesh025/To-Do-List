let tasks = [];

// Load tasks on page load
window.onload = function () {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
    renderTasks();
};

// Add task
function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();
    const message = document.getElementById("message");

    if (text === "") {
        alert("Task cannot be empty");
        return;
    }

    tasks.push({ text: text, completed: false });
    saveTasks();
    renderTasks();

    message.textContent = "Task added successfully.";
    input.value = "";
}

// Render tasks
function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.text;
        span.style.cursor = "pointer";
        if (task.completed) span.classList.add("completed");

        span.onclick = function () {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        };

        // Edit button
        const editBtn = document.createElement("button");
        editBtn.innerHTML = "✏️";
        editBtn.className = "icon-btn";
        editBtn.onclick = function () {
            editTask(index);
        };

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "❌";
        deleteBtn.className = "icon-btn delete";
        deleteBtn.onclick = function () {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        };

        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });

    updateCounter();
}

// Edit task
function editTask(index) {
    const newText = prompt("Edit task:", tasks[index].text);

    if (newText === null) return;

    if (newText.trim() === "") {
        alert("Task cannot be empty");
        return;
    }

    tasks[index].text = newText.trim();
    saveTasks();
    renderTasks();

    document.getElementById("message").textContent =
        "Task updated successfully.";
}

// Clear completed tasks
function clearCompleted() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();

    document.getElementById("message").textContent =
        "Completed tasks cleared.";
}

// Counter
function updateCounter() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;

    document.getElementById("counter").textContent =
        `Total: ${total} | Completed: ${completed} | Pending: ${pending}`;
}

// Save to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
