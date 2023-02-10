function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnCreateRef = document.querySelector("button[data-add]");
const btnClearRef = document.querySelector("button[data-clear]");
const btnCompletedRef = document.querySelector("button[data-action='completed']");
const btnDeleteRef = document.querySelector("button[data-action='delete']");
const input = document.querySelector("input");
const taskListRef = document.querySelector(".list");
const textEmpty = document.querySelector(".text-empty");

//функцію destroyBoxes(), яка очищає вміст div#boxes, видаляє всі таски
btnClearRef.addEventListener("click", () => {
  taskListRef.innerHTML = "";
  textEmpty.classList.remove("hidden");
});

btnCreateRef.addEventListener("click", (event) => {
  if (input.value.trim() === "") {
    return alert("Please write your new task");
  }
  //отримаємо значення task з input
  let markup = createTask(input.value);
  taskListRef.insertAdjacentHTML("beforeend", markup);
  input.value = "";
  input.focus();
  if (taskListRef.children.length > 0) {
    textEmpty.classList.add("hidden");
  }
});

taskListRef.addEventListener("click", completedTask);

taskListRef.addEventListener("click", deleteTask);

function createTask(taskName) {
  let stringMarkup = `<li >
  <div class="task"><p class="text">
    ${taskName}
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
    const perentNod = event.target.closest(".task");
    perentNod.classList.toggle("completed-task");
  }
}

function deleteTask(event) {
  if (event.target.dataset.action === "delete") {
    const perentNodLi = event.target.closest("li");
    perentNodLi.remove();
  }
  if (taskListRef.children.length === 0) {
    textEmpty.classList.remove("hidden");
  }
}
