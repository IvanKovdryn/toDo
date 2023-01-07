// Знаходимо елементи на сторінці

const form = document.querySelector(".form");
const input = document.querySelector(".input");
const list = document.querySelector(".list");

let tasks = [];

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach((task) => renderTask(task));
}

checkEmptyList();

form.addEventListener("submit", addTask);
list.addEventListener("click", deleteTask);
list.addEventListener("click", doneTask);

function addTask(event) {
  event.preventDefault();
  const taskText = input.value;

  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };
  tasks.push(newTask);
  saveToLocalStorage();
  renderTask(newTask);
  console.log(tasks);
  input.value = "";
  input.focus();
  checkEmptyList();
}
function deleteTask(event) {
  if (event.target.dataset.action !== "remove") return;
  const parentNode = event.target.closest(".item");
  const id = Number(parentNode.id);
  tasks = tasks.filter((task) => task.id !== id);
  saveToLocalStorage();
  parentNode.remove();
  checkEmptyList();
}
function doneTask(event) {
  if (event.target.dataset.action !== "add") return;
  const parentNode = event.target.closest(".item");
  const id = Number(parentNode.id);
  const task = tasks.find((task) => task.id === id);
  task.done = !task.done;
  saveToLocalStorage();
  const itemText = parentNode.querySelector(".item-text");
  itemText.classList.toggle("done");
}
function checkEmptyList() {
  if (tasks.length === 0) {
    const emptyListHTML = `<li class="img-wrapper">
    <img class="img" src="./img/1263914.png" alt="img" />
    <div class="img-text">Список справ пустий</div>
  </li>`;
    list.insertAdjacentHTML("afterbegin", emptyListHTML);
  }
  if (tasks.length > 0) {
    const emptyListEl = document.querySelector(".img-wrapper");
    emptyListEl ? emptyListEl.remove() : null;
  }
}
function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function renderTask(task) {
  const cssClass = task.done ? "item-text done" : "item-text";
  const taskHTML = `<li id="${task.id}" class="item">
  <span class="${cssClass}">${task.text}</span>
  <button data-action="add" class="icon-check add"></button>
  <button data-action="remove" class="icon-x remove"></button>
</li>`;
  list.insertAdjacentHTML("beforeend", taskHTML);
}
