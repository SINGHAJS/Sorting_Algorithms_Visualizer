const ARRAY_LENGTH = 25;
let initArray = new Array(ARRAY_LENGTH);
const displayContainer = document.getElementById("progress-display");
const resetBtn = document.getElementById("reset");
const bubbleSortBtn = document.getElementById("bubble-sort");
const selectionSortBtn = document.getElementById("selection-sort");
const comparisonsEl = document.getElementById("total-comparisons");
const timeTakenEl = document.getElementById("time-taken");

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

const reset = () => {
  fillArray(initArray);
  displayContainer.innerHTML = "";
  createBars(initArray);
  comparisonsEl.innerHTML = "0";
  timeTakenEl.innerHTML = "0 ms";
};

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function selectionSort() {
  // variable initialization
  let bars = document.querySelectorAll(".bar");
  let min_num = 0;
  let min_num_index = 0;
  let comparisons = 0;

  let startTime = window.performance.now();
  let endTime = 0;
  for (let i = 0; i < ARRAY_LENGTH - 1; i++) {
    // set minimum number (min_num) to the array value at index i
    // set the minimum number index value (min_num_index)
    min_num = initArray[i];
    min_num_index = i;

    // check and compare number values of current index (i) and next index (i + 1)
    for (let j = i + 1; j < ARRAY_LENGTH; j++) {
      if (initArray[j] < min_num) {
        // if the next index value is smaller than the current index value
        // change the min_num value to the next index value
        min_num = initArray[j];
        min_num_index = j;
        comparisons++;
      }
      comparisonsEl.innerHTML = comparisons;
      endTime = window.performance.now();
      timeTakenEl.innerHTML = `${Math.floor(endTime - startTime)} ms`;
    }

    // swap
    // change the current index value to the new minimum number (min_num)
    // change the next index value to the current index value
    initArray[min_num_index] = initArray[i];
    initArray[i] = min_num;

    bars[min_num_index].style.height = `${initArray[i]}%`;
    bars[min_num_index].innerHTML = initArray[i];

    bars[i].style.height = `${initArray[i]}%`;
    bars[i].innerHTML = initArray[i];
    await sleep(50);
  }
}

async function bubbleSort() {
  let bars = document.querySelectorAll(".bar");
  let comparisons = 0;
  let startTime = window.performance.now();
  let endTime = 0;

  for (let i = 0; i < ARRAY_LENGTH; i++) {
    for (let j = 0; j < ARRAY_LENGTH - i - 1; j++) {
      if (initArray[j] > initArray[j + 1]) {
        let temp = initArray[j];
        initArray[j] = initArray[j + 1];
        initArray[j + 1] = temp;
        bars[j].style.height = `${initArray[j]}%`;
        bars[j].innerHTML = initArray[j];

        bars[j + 1].style.height = `${initArray[j + 1]}%`;
        bars[j + 1].innerHTML = initArray[j + 1];
        comparisons++;
        comparisonsEl.innerHTML = comparisons;
        endTime = window.performance.now();
        timeTakenEl.innerHTML = `${Math.floor(endTime - startTime)} ms`;
        await sleep(50);
      }
    }
    await sleep(50);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initArray = new Array(ARRAY_LENGTH);
  fillArray();
  createBars();
});

resetBtn.addEventListener("click", reset);
bubbleSortBtn.addEventListener("click", bubbleSort);
selectionSortBtn.addEventListener("click", selectionSort);
