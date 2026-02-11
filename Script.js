let tasks = [];
let currentFilter = "all";
let currentSearch = "";

// Load saved tasks
window.onload = function () {
    const saved = localStorage.getItem("tasks");
    if (saved) {
        tasks = JSON.parse(saved);
    }
    renderTasks();
};

function addTask() {
    const input = document.getElementById("taskInput");
    const dateInput = document.getElementById("dueDate");
    const text = input.value.trim();

    if (text === "") {
        alert("Task cannot be empty");
        return;
    }

    tasks.push({
        text: text,
        completed: false,
        dueDate: dateInput.value
    });

    saveTasks();
    renderTasks();

    document.getElementById("message").textContent =
        "Task added successfully.";

    input.value = "";
    dateInput.value = "";
}

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    let filtered = tasks;

    // Apply filter
    if (currentFilter === "completed") {
        filtered = tasks.filter(t => t.completed);
    } else if (currentFilter === "pending") {
        filtered = tasks.filter(t => !t.completed);
    }

    // Apply search
    if (currentSearch !== "") {
        filtered = filtered.filter(t =>
            t.text.toLowerCase().includes(currentSearch)
        );
    }

    if (filtered.length === 0) {
        list.innerHTML = "<p>No tasks found.</p>";
        updateCounter();
        return;
    }

    filtered.forEach((task) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent =
            task.text + (task.dueDate ? " (Due: " + task.dueDate + ")" : "");

        if (task.completed) {
            span.classList.add("completed");
        }

        span.onclick = function () {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        };

        const editBtn = document.createElement("button");
        editBtn.innerHTML = "✏️";
        editBtn.className = "icon-btn";
        editBtn.onclick = function () {
            const newText = prompt("Edit task:", task.text);
            if (newText && newText.trim() !== "") {
                task.text = newText.trim();
                document.getElementById("message").textContent =
                    "Task updated successfully.";
                saveTasks();
                renderTasks();
            } else {
                alert("Task cannot be empty");
            }
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "❌";
        deleteBtn.className = "icon-btn delete";
        deleteBtn.onclick = function () {
            tasks = tasks.filter(t => t !== task);
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

function setFilter(filter) {
    currentFilter = filter;
    renderTasks();
}

function searchTasks() {
    const input = document.getElementById("searchInput");
    const value = input.value.trim();

    if (value === "") {
        alert("Search field cannot be empty");
        return;
    }

    currentSearch = value.toLowerCase();
    renderTasks();
}

function clearCompleted() {
    tasks = tasks.filter(t => !t.completed);
    saveTasks();
    renderTasks();

    document.getElementById("message").textContent =
        "Completed tasks cleared.";
}

function updateCounter() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;

    document.getElementById("counter").textContent =
        `Total: ${total} | Completed: ${completed} | Pending: ${pending}`;
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
