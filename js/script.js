const ARRAY_LENGTH = 20;
let initArray = new Array(ARRAY_LENGTH);
const bar = document.querySelector(".Bar");
const displayContainer = document.getElementById("progress-display");
const resetBtn = document.getElementById("reset");
const bubbleSortBtn = document.getElementById("bubble-sort");

function generateRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function fillArray(array) {
  for (let i = 0; i < ARRAY_LENGTH; i++) {
    initArray[i] = generateRandomInt(10, 100);
  }
}

function createBars(array) {
  for (let i = 0; i < ARRAY_LENGTH; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${initArray[i]}%`;
    bar.innerHTML = initArray[i];
    displayContainer.appendChild(bar);
  }
}

const resetArray = () => {
  fillArray(initArray);
  displayContainer.innerHTML = "";
  createBars(initArray);
};

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function bubbleSort() {
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < ARRAY_LENGTH; i++) {
    for (let j = 0; j < ARRAY_LENGTH - i - 1; j++) {
      if (initArray[j] > initArray[j + 1]) {
        let temp = initArray[j];
        initArray[j] = initArray[j + 1];
        initArray[j + 1] = temp;
        bars[j].style.height = `${initArray[j]}%`;
        bars[j].style.backgroundColor = "green";
        bars[j].innerHTML = initArray[j];

        bars[j + 1].style.height = `${initArray[j + 1]}%`;
        bars[j + 1].style.backgroundColor = "green";
        bars[j + 1].innerHTML = initArray[j + 1];
        await delay(100);
      }
    }
    await delay(100);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initArray = new Array(ARRAY_LENGTH);
  fillArray();
  createBars();
});

resetBtn.addEventListener("click", resetArray);
bubbleSortBtn.addEventListener("click", bubbleSort);
