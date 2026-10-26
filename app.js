//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById("new-task"); //Add a new task.
const addButton = document.getElementsByTagName("button")[0]; //first button
const todoList = document.getElementById("todo-tasks"); //ul of #incompleteTasks
const completedList = document.getElementById("completed-tasks"); //completed-tasks

//New task list item
const createTaskItem = function (taskText) {
  const taskItem = document.createElement("li");

  //input (checkbox)
  const checkbox = document.createElement("input"); //checkbx
  //label
  const label = document.createElement("label"); //label
  //input (text)
  const editInput = document.createElement("input"); //text
  //button.edit
  const editButton = document.createElement("button"); //edit button

  //button.delete
  const deleteButton = document.createElement("button"); //delete button
  const deleteIcon = document.createElement("img"); //delete button image

  label.innerText = taskText;
  label.className = "task";

  //Each elements, needs appending
  checkbox.type = "checkbox";
  editInput.type = "text";
  editInput.className = "task";

  editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
  editButton.className = "edit";

  deleteButton.className = "delete";
  deleteIcon.src = "./remove.svg";
  deleteButton.appendChild(deleteIcon);

  //and appending.
  taskItem.appendChild(checkbox);
  taskItem.appendChild(label);
  taskItem.appendChild(editInput);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);
  return taskItem;
};

const addTask = function () {
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  const taskItem = createTaskItem(taskInput.value);

  //Append listItem to incompleteTaskHolder
  todoList.appendChild(taskItem);
  bindTaskEvents(taskItem);

  taskInput.value = "";
};

//Edit an existing task.

const editTask = function () {
  const taskItem = this.parentNode;

  const editInput = taskItem.querySelector("input[type=text]");
  const label = taskItem.querySelector("label");
  const editButton = taskItem.querySelector(".edit");
  const isEditing = taskItem.classList.contains("edit-mode");
  //If class of the parent is .editmode
  if (isEditing) {
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editButton.innerText = "Save";
  }

  //toggle .editmode on the parent.
  taskItem.classList.toggle("edit-mode");
};

//Delete task.
const deleteTask = function () {
  const taskItem = this.parentNode;
  const list = taskItem.parentNode;
  //Remove the parent list item from the ul.
  list.removeChild(taskItem);
};

const toggleTask = function (event) {
  const checkbox = event.currentTarget;
  const taskItem = checkbox.parentNode;
  const targetList = checkbox.checked ? completedList : todoList;
  targetList.appendChild(taskItem);
};

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.addEventListener("click", addTask);

const bindTaskEvents = function (taskItem) {
  //select ListItems children
  const checkbox = taskItem.querySelector("input[type=checkbox]");
  const editButton = taskItem.querySelector("button.edit");
  const deleteButton = taskItem.querySelector("button.delete");

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
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

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
