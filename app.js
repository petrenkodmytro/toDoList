const btnCreateRef = document.querySelector("button[data-add]");
const btnClearRef = document.querySelector("button[data-clear]");
const btnCompletedRef = document.querySelector("button[data-action='completed']");
const btnDeleteRef = document.querySelector("button[data-action='delete']");
const input = document.querySelector("input");
const taskListRef = document.querySelector(".list");
const textEmpty = document.querySelector(".empty");

// создаем массив с задачами (база данных для Local Storage)
let tasks = [];

// если в хранилище браузера есть данные, мы их забираем
if (localStorage.getItem("tasks")) {
  console.log(localStorage.getItem("tasks"));
  tasks = JSON.parse(localStorage.getItem("tasks"));
  
  // проверка на пустой массив
  if (tasks.length > 0) {
    textEmpty.classList.add("hidden");
  }
  // создаем разметку из данных хранилища
  tasks.forEach((task) => {
    createMarkupFromLocalStorage(task);
  });
}

function createMarkupFromLocalStorage(task) {
  // формируем CSS класс задачи (выполнена или нет)
  const cssClass = task.done ? "task completed-task" : "task";

  // создаем разменту
  let stringMarkup = `<li id = "${task.id}">
  <div class="${cssClass}"><p class="text">
    ${task.text}
  </p>
  <button class="btn completed" type="button" data-action="completed">
    <svg class="icon-completed" width="20" height="20">
      <use href="./img/icons.svg#checkmark2"></use>
    </svg>
  </button>
  <button class="btn delete" type="button" data-action="delete">
    <svg class="icon-delete" width="20" height="20">
      <use href="./img/icons.svg#bin"></use>
    </svg>
  </button></div>
</li>`;
  taskListRef.insertAdjacentHTML("beforeend", stringMarkup);
}

btnClearRef.addEventListener("click", ClearAllTask);

//функция destroyBoxes(), удаляет все задачи
function ClearAllTask() {
  taskListRef.innerHTML = "";
  tasks.length = 0;
  textEmpty.classList.remove("hidden");
  saveToLocalStorage();
}

btnCreateRef.addEventListener("click", (event) => {
  // проверяем на пустую строку
  if (input.value.trim() === "") {
    return alert("Please write your new task");
  }

  //получаем значение task из input
  let markup = createTask(input.value);
  taskListRef.insertAdjacentHTML("beforeend", markup);

  //очищаем поле input и оставляем его в фокусе
  input.value = "";
  input.focus();
  if (taskListRef.children.length > 0) {
    textEmpty.classList.add("hidden");
  }
});

taskListRef.addEventListener("click", completedTask);

taskListRef.addEventListener("click", deleteTask);

function createTask(taskName) {
  // создаем об'ект задачи
  const newTask = {
    id: Date.now(),
    text: taskName,
    done: false,
  };

  // добавляем задачу в масив
  tasks.push(newTask);
  saveToLocalStorage();

  // формируем CSS класс задачи (выполнена или нет)
  const cssClass = newTask.done ? "task completed-task" : "task";

  // создаем разменту
  let stringMarkup = `<li id = "${newTask.id}">
  <div class="${cssClass}"><p class="text">
    ${newTask.text}
  </p>
  <button class="btn completed" type="button" data-action="completed">
    <svg class="icon-completed" width="20" height="20">
      <use href="./img/icons.svg#checkmark2"></use>
    </svg>
  </button>
  <button class="btn delete" type="button" data-action="delete">
    <svg class="icon-delete" width="20" height="20">
      <use href="./img/icons.svg#bin"></use>
    </svg>
  </button></div>
</li>`;

  return stringMarkup;
}

function completedTask(event) {
  if (event.target.dataset.action === "completed") {
    // находим предка с тегом "li"
    const perentNodLi = event.target.closest("li");

    // находим конкретную задачу по ID
    const task = tasks.find((task) => Number(perentNodLi.id) === task.id);

    // отмечаем как выполненную в массиве
    task.done = !task.done;
    
    // отмечаем задачу как выполненую в списке
    perentNodLi.classList.toggle("completed-task");

    saveToLocalStorage();
  }
}

function deleteTask(event) {
  if (event.target.dataset.action === "delete") {
    // находим предка с тегом "li"
    const perentNodLi = event.target.closest("li");

    // определяем ID задачи
    const indexIdTask = tasks.findIndex((task) => Number(perentNodLi.id) === task.id);

    // удаляем задачу из масива
    tasks.splice(indexIdTask, 1);
    saveToLocalStorage();

    // удаляем задачу из списка
    perentNodLi.remove();
  }
  if (taskListRef.children.length === 0) {
    textEmpty.classList.remove("hidden");
  }
}

// функция сохранения данных масива в LocalStorage
function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
