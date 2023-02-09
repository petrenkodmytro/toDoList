function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnCreateRef = document.querySelector("button[data-add]");
const btnDestroyRef = document.querySelector("button[data-delete]");
const input = document.querySelector("input");
const divBoxes = document.querySelector("#boxes");

//функцію destroyBoxes(), яка очищає вміст div#boxes
btnDestroyRef.addEventListener("click", () => {
  divBoxes.innerHTML = "";
});

btnCreateRef.addEventListener("click", (event) => {
  //отримаємо значення з input
  let markup = createBoxes(input.value);
  // divBoxes.insertAdjacentHTML("beforeend", markup);
  divBoxes.append(markup);
});

function createBoxes(amount) {
  let stringMarkup = "";
  for (let i = 1; i <= amount; i += 1) {
    stringMarkup += `<div class="item" style="background: ${getRandomHexColor()}; width: ${30 + 10 * i}px; height: ${30 + 10 * i}px">${i}</div>`;
  }
  return stringMarkup;
}

// 1.Напиши скрипт створення і очищення колекції елементів. Користувач вводить кількість елементів в input і натискає кнопку Створити, після чого рендериться колекція. Натисненням на кнопку Очистити, колекція елементів очищається.
// 2.Створи функцію createBoxes(amount), яка приймає один параметр - число. Функція створює стільки <div>, скільки вказано в amount і додає їх у div#boxes.
// 3.Розміри найпершого <div> - 30px на 30px.
// 4.Кожен елемент після першого повинен бути ширшим і вищим від попереднього на 10px.
// 5.Всі елементи повинні мати випадковий колір фону у форматі HEX. Використовуй готову функцію getRandomHexColor для отримання кольору.
// 6.Створи функцію destroyBoxes(), яка очищає вміст div#boxes, у такий спосіб видаляючи всі створені елементи.
