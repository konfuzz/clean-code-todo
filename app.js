const taskInput = document.getElementById("new-task");
const addButton = document.getElementsByTagName("button")[0];
const todoList = document.getElementById("todo-tasks");
const completedList = document.getElementById("completed-tasks");

const createElement = function (tagName, props = {}) {
  return Object.assign(document.createElement(tagName), props);
};

const createTaskItem = function (taskText) {
  const taskItem = createElement("li");
  const deleteButton = createElement("button", { className: "delete" });
  deleteButton.append(createElement("img", { src: "./remove.svg" }));

  taskItem.append(
    createElement("input", { type: "checkbox" }),
    createElement("label", { className: "task", innerText: taskText }),
    createElement("input", { type: "text", className: "task" }),
    createElement("button", { className: "edit", innerText: "Edit" }),
    deleteButton,
  );

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
  const isEditing = taskItem.classList.toggle("edit-mode");

  if (isEditing) {
    editInput.value = label.innerText;
    this.innerText = "Save";
  } else {
    label.innerText = editInput.value;
    this.innerText = "Edit";
  }
};

const deleteTask = function () {
  this.parentNode.remove();
};

const toggleTask = function () {
  const targetList = this.checked ? completedList : todoList;
  targetList.appendChild(this.parentNode);
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
