let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let clearBtn = document.getElementById("clearBtn");
let listContainer = document.getElementById("listContainer");
let taskCounter = document.getElementById("taskCounter");

console.log(listContainer);
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
taskCounter.innerText = 0;

function updateTaskCounter() {
  taskCounter.innerText = tasks.length;
}

// creating task via create element
function createTask(obj) {
  // create li
  const li = document.createElement("li");
  li.className = "task-li";
  obj.completed && li.classList.add("completed");
  // create input
  const input = document.createElement("input");
  input.className = "task-content";
  input.value = obj.value;
  input.disabled = true;

  //   marking task as completed

  // create div
  const div = document.createElement("div");

  // create buttons
  const editBtn = document.createElement("button");
  editBtn.className = "edit-task-btn";
  editBtn.textContent = "Edit";

  const completeBtn = document.createElement("button");
  completeBtn.className = "complete-task-btn";
  completeBtn.textContent = "complete";

  completeBtn.onclick = (e) => {
    let index = tasks.indexOf(obj);
    tasks[index].completed = !tasks[index].completed;

    localStorage.setItem("tasks", JSON.stringify(tasks));

    li.classList.toggle("completed");

    console.log(e.target);
  };

  const saveBtn = document.createElement("button");
  saveBtn.className = "save-task-btn disabled";

  saveBtn.textContent = "Save";

  editBtn.onclick = () => {
    saveBtn.classList.remove("disabled");
    editBtn.classList.add("disabled");
    input.disabled = false;
  };
  saveBtn.onclick = () => {
    saveBtn.classList.add("disabled");
    editBtn.classList.remove("disabled");
    input.disabled = true;

    taskIndex = tasks.indexOf(obj);

    updateTask(taskIndex, input.value);
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-task-btn";
  deleteBtn.textContent = "Delete";

  deleteBtn.onclick = () => removeTask(obj);

  // append buttons to div
  div.appendChild(editBtn);
  div.appendChild(saveBtn);
  div.appendChild(deleteBtn);
  div.appendChild(completeBtn);

  // append input and div to li
  li.appendChild(input);
  li.appendChild(div);

  // append li to a list (example)
  listContainer.appendChild(li);
}

// updating ui
function updateTaskUi(arr) {
  listContainer.innerHTML = "";
  arr.forEach((element) => {
    createTask(element);
  });
}

function addTask(value) {
  if (value) {
    let task = {
      id: tasks.length,
      value,
      completed: false,
    };
    tasks.unshift(task);

    updateTaskUi(tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateTaskCounter();
  } else {
    alert("tasks should have value");
  }
}

// removing task
function removeTask(obj) {
  let index = tasks.indexOf(obj);
  tasks.splice(index, 1);

  updateTaskUi(tasks);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  updateTaskCounter();
}

function updateTask(index, value) {
  tasks[index].value = value;
  updateTaskUi(tasks);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// marking task as completed

clearBtn.addEventListener("click", () => {
  tasks = [];
  localStorage.setItem("tasks", JSON.stringify(tasks));

  updateTaskUi(tasks);
  updateTaskCounter();
});

// adding task
addBtn.addEventListener("click", () => {
  addTask(taskInput.value);
});

//
// initial setup
updateTaskUi(tasks);
updateTaskCounter();
