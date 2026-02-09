function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    let message = document.getElementById("message");

    if (taskText === "") {
        alert("Task cannot be empty");
        return;
    }

    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = taskText;
    span.onclick = function () {
        span.classList.toggle("completed");
    };

    let completeBtn = document.createElement("button");
    completeBtn.innerHTML = "✔️";
    completeBtn.className = "icon-btn";
    completeBtn.onclick = function () {
        span.classList.toggle("completed");
    };

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "❌";
    deleteBtn.className = "icon-btn delete";
    deleteBtn.onclick = function () {
        li.remove();
    };

    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    document.getElementById("taskList").appendChild(li);

    message.textContent = "Task added successfully.";
    taskInput.value = "";
}
