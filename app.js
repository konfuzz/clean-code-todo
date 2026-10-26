const taskInput = document.getElementById("new-task");
const addButton = document.getElementsByTagName("button")[0];
const todoList = document.getElementById("todo-tasks");
const completedList = document.getElementById("completed-tasks");

const createTaskItem = function (taskText) {
  const taskItem = document.createElement("li");

  const checkbox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");

  const deleteButton = document.createElement("button");
  const deleteIcon = document.createElement("img");

  label.innerText = taskText;
  label.className = "task";

  checkbox.type = "checkbox";
  editInput.type = "text";
  editInput.className = "task";

  editButton.innerText = "Edit";
  editButton.className = "edit";

  deleteButton.className = "delete";
  deleteIcon.src = "./remove.svg";
  deleteButton.appendChild(deleteIcon);

  taskItem.appendChild(checkbox);
  taskItem.appendChild(label);
  taskItem.appendChild(editInput);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);
  return taskItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const taskItem = createTaskItem(taskInput.value);

  todoList.appendChild(taskItem);
  bindTaskEvents(taskItem);

  taskInput.value = "";
};

const editTask = function () {
  const taskItem = this.parentNode;

  const editInput = taskItem.querySelector("input[type=text]");
  const label = taskItem.querySelector("label");
  const editButton = taskItem.querySelector(".edit");
  const isEditing = taskItem.classList.contains("edit-mode");
  if (isEditing) {
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editButton.innerText = "Save";
  }

  taskItem.classList.toggle("edit-mode");
};

const deleteTask = function () {
  this.parentNode.remove();
};

const toggleTask = function (event) {
  const checkbox = event.currentTarget;
  const taskItem = checkbox.parentNode;
  const targetList = checkbox.checked ? completedList : todoList;
  targetList.appendChild(taskItem);
};

addButton.addEventListener("click", addTask);

const bindTaskEvents = function (taskItem) {
  const checkbox = taskItem.querySelector("input[type=checkbox]");
  const editButton = taskItem.querySelector("button.edit");
  const deleteButton = taskItem.querySelector("button.delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkbox.onchange = toggleTask;
};

const bindTasks = function (taskList) {
  for (const taskItem of taskList.children) {
    bindTaskEvents(taskItem);
  }
};

bindTasks(todoList);
bindTasks(completedList);
