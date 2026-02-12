let tasks = [
    {
        title: "Name",
        value: "Neelesh",
        date: "12-02-2026",
        priority: "High",
        completed: true
    },
    {
        title: "Phone",
        value: "8332817053",
        date: "12-02-2026",
        priority: "Medium",
        completed: true
    },
    {
        title: "Email",
        value: "neelesh@certifaed.com",
        date: "12-02-2026",
        priority: "Low",
        completed: false
    }
];

function renderTasks(filteredTasks = tasks) {
    const container = document.getElementById("taskContainer");
    container.innerHTML = "";

    filteredTasks.forEach((task, index) => {
        const card = document.createElement("div");
        card.className = "task-card";

        card.innerHTML = `
            <h4>Task-${index + 1} : ${task.title}</h4>
            <p>${task.value}</p>
            <p>${task.date}</p>
            <span class="priority ${task.priority.toLowerCase()}">
                ${task.priority} Priority
            </span>
        `;

        container.appendChild(card);
    });

    updateSummary();
}

function updateSummary() {
    document.getElementById("total").innerText = tasks.length;
    document.getElementById("completed").innerText =
        tasks.filter(t => t.completed).length;
    document.getElementById("pending").innerText =
        tasks.filter(t => !t.completed).length;
}

function searchTasks() {
    const value = document.getElementById("searchInput").value.trim();
    if (value === "") {
        renderTasks();
        return;
    }

    const number = parseInt(value);

    if (!isNaN(number) && number > 0 && number <= tasks.length) {
        renderTasks([tasks[number - 1]]);
    } else {
        document.getElementById("taskContainer").innerHTML =
            "<p>No tasks found.</p>";
    }
}

function clearCompleted() {
    tasks = tasks.filter(t => !t.completed);
    renderTasks();
}

renderTasks();
