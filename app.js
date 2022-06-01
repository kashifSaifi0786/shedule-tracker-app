// selecting things
const todoList = document.querySelector(".todo-list");
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const filterOptions = document.querySelector("#filter-todo");

// attach event handlers
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", checkAndDeleteTodo);
filterOptions.addEventListener("click", filterTodo);

// functions
function addTodo(e) {
  e.preventDefault();

  // create a div for todo
  const todo = document.createElement("div");
  todo.classList.add("todo");

  // create a li for todo item
  const todoItem = document.createElement("li");
  todoItem.classList.add("todo-item");

  saveLocalTodos(todoInput.value);

  todoItem.innerText = todoInput.value;
  todo.appendChild(todoItem);

  // create a button for complete check
  const completeButton = document.createElement("button");
  completeButton.classList.add("complete-btn");
  completeButton.innerHTML = '<i class="fas fa-check"></i>';
  todo.appendChild(completeButton);

  // create a button for trash todo
  const trashButton = document.createElement("button");
  trashButton.classList.add("trash-btn");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  todo.appendChild(trashButton);

  // append todo into todolist
  todoList.appendChild(todo);

  // clear the input value after rendering todo
  todoInput.value = "";
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    if (filterOptions.value === "all") {
      todo.style.display = "flex";
    }
    if (filterOptions.value === "completed") {
      if (todo.classList.contains("completed")) todo.style.display = "flex";
      else todo.style.display = "none";
    }
    if (filterOptions.value === "uncompleted") {
      if (!todo.classList.contains("completed")) todo.style.display = "flex";
      else todo.style.display = "none";
    }
  });
}

function checkAndDeleteTodo(e) {
  const selectedItem = e.target;

  if (selectedItem.classList[0] === "complete-btn") {
    const todo = selectedItem.parentElement;
    todo.classList.toggle("completed");
  }
  if (selectedItem.classList[0] === "trash-btn") {
    const todo = selectedItem.parentElement;
    todo.classList.add("fall");

    removeLocalTodos(todo);
    todo.addEventListener("transitionend", (e) => {
      todo.remove();
    });
  }
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";
    //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //attach final Todo
    todoList.appendChild(todoDiv);
  });
}
