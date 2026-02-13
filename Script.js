let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    let text = document.getElementById("taskInput").value.trim();
    let date = document.getElementById("dueDate").value;
    let priority = document.getElementById("priority").value;
    let message = document.getElementById("message");

    if (text === "" || priority === "") {
        message.textContent = "Task and Priority required.";
        return;
    }

    tasks.push({
        text,
        date,
        priority,
        completed: false
    });

    saveTasks();
    renderTasks();
    message.textContent = "Task added successfully.";

    document.getElementById("taskInput").value = "";
    document.getElementById("dueDate").value = "";
    document.getElementById("priority").value = "";
}

function renderTasks(filteredTasks = tasks) {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    filteredTasks.forEach((task, index) => {
        const originalIndex = tasks.indexOf(task);

        const li = document.createElement("li");

        li.innerHTML = `
            <strong>Task-${originalIndex + 1} : ${task.text}</strong><br>
            ${task.date || ""}<br>
            <span class="${task.priority.toLowerCase()}">${task.priority}</span>
            <br>
            <button onclick="toggleComplete(${originalIndex})">✔</button>
            <button onclick="editTask(${originalIndex})">✏</button>
            <button onclick="deleteTask(${originalIndex})">❌</button>
        `;

        if (task.completed) {
            li.classList.add("completed");
        }

        list.appendChild(li);
    });

    updateCounter();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function editTask(index) {
    let newText = prompt("Edit Task", tasks[index].text);
    if (newText && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function filterTasks(type) {
    if (type === "completed")
        renderTasks(tasks.filter(t => t.completed));
    else if (type === "pending")
        renderTasks(tasks.filter(t => !t.completed));
    else
        renderTasks();
}

function searchTask() {
    let keyword = document.getElementById("searchInput").value.trim();
    if (keyword === "") {
        alert("Enter text to search");
        return;
    }

    renderTasks(tasks.filter(t =>
        t.text.toLowerCase().includes(keyword.toLowerCase())
    ));
}

function updateCounter() {
    document.getElementById("total").textContent = tasks.length;
    document.getElementById("completed").textContent =
        tasks.filter(t => t.completed).length;
    document.getElementById("pending").textContent =
        tasks.filter(t => !t.completed).length;
}

function clearCompleted() {
    tasks = tasks.filter(t => !t.completed);
    saveTasks();
    renderTasks();
}

function exportTasks() {

    if (tasks.length === 0) {
        alert("No tasks available to export.");
        return;
    }

    let csv = "Task No,Task Name,Status,Priority,Due Date\n";

    tasks.forEach((task, index) => {
        csv += `Task-${index + 1},${task.text},${task.completed ? "Completed" : "Pending"},${task.priority},${task.date || ""}\n`;
    });

    let blob = new Blob([csv], { type: "text/csv" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "tasks.csv";
    a.click();

    alert("Tasks exported successfully.");
}

renderTasks();
