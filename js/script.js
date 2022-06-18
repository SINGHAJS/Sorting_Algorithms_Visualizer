const ARRAY_LENGTH = 25;
let initArray = new Array(ARRAY_LENGTH);
const displayContainer = document.getElementById("progress-display");
const resetBtn = document.getElementById("reset");
const comparisonsEl = document.getElementById("total-comparisons");
const timeTakenEl = document.getElementById("time-taken");
const bubbleSortBtn = document.getElementById("bubble-sort");
const selectionSortBtn = document.getElementById("selection-sort");
const mergeSortBtn = document.getElementById("merge-sort");

/*********************************************************************************************************************
 * Methods To Create Array, Bars, UI, Sleep, and Reset
 *********************************************************************************************************************/

/**
 * Generate a random integer between min and max.
 * @param min - The minimum number that can be returned.
 * @param max - The maximum number that can be generated.
 * @returns A random integer between the min and max values.
 */
function generateRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * It fills an array with random integers
 * @param array - the array to be filled
 */
function fillArray(array) {
  for (let i = 0; i < ARRAY_LENGTH; i++) {
    initArray[i] = generateRandomInt(10, 100);
  }
}

/**
 * It creates a div element for each element in the array, sets the height of the div to the value of
 * the array element, and appends the div to the display container
 * @param array - the array
 */
function createBars(array) {
  for (let i = 0; i < ARRAY_LENGTH; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${initArray[i]}%`;
    bar.innerHTML = initArray[i];
    displayContainer.appendChild(bar);
  }
}

/**
 * It resets the array to its initial state, clears the display container, creates new bars, and resets
 * the comparisons and time taken elements
 */
const reset = () => {
  fillArray(initArray);
  displayContainer.innerHTML = "";
  createBars(initArray);
  comparisonsEl.innerHTML = "0";
  timeTakenEl.innerHTML = "0 ms";
};

/**
 * Sleep() returns a promise that resolves after a given time.
 * @param time - The time in milliseconds to wait before resolving the promise.
 * @returns A promise that will resolve after the given time.
 */
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

/*********************************************************************************************************************
 * Sorting Algorithms
 *********************************************************************************************************************/

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
        bars[j].style.backgroundColor = "red";
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
    bars[min_num_index].style.backgroundColor = "green";

    bars[i].style.height = `${initArray[i]}%`;
    bars[i].innerHTML = initArray[i];
    bars[i].style.backgroundColor = "green";

    await sleep(50);
  }

  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "green";
  }
}

/**
 * The bubbleSort function is responsible for sorting the bars in ascending order.
 */
async function bubbleSort() {
  /* This is declaring variables that will be used in the bubbleSort function. */
  let bars = document.querySelectorAll(".bar");
  let comparisons = 0;
  let startTime = window.performance.now();
  let endTime = 0;

  for (let i = 0; i < ARRAY_LENGTH; i++) {
    for (let j = 0; j < ARRAY_LENGTH - i - 1; j++) {
      /* This is the code that is responsible for the swapping of the bars. */
      if (initArray[j] > initArray[j + 1]) {
        let temp = initArray[j];
        initArray[j] = initArray[j + 1];
        initArray[j + 1] = temp;
        bars[j].style.height = `${initArray[j]}%`;
        bars[j].innerHTML = initArray[j];
        bars[j].style.backgroundColor = "red";

        bars[j + 1].style.height = `${initArray[j + 1]}%`;
        bars[j + 1].innerHTML = initArray[j + 1];
        bars[j + 1].style.backgroundColor = "red";
        comparisons++;
        comparisonsEl.innerHTML = comparisons;
        endTime = window.performance.now();
        timeTakenEl.innerHTML = `${Math.floor(endTime - startTime)} ms`;
        /* This is a function that is used to pause the execution of the code for a certain amount of
        time. */
        await sleep(50);
      }
      bars[j].style.backgroundColor = "black";
      bars[j + 1].style.backgroundColor = "black";
    }
  }
  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "green";
  }
}

function mergeSortMain() {
  // mergeSort(initArray);
  console.log(initArray);
}

// function mergeSort(array) {
//   if (array.length <= 1) return;
//   let middle = Math.floor(array.length / 2);
//   let leftArr = array.splice(0, middle);
//   let rightArr = array.splice(middle);

//   mergeSort(leftArr);
//   mergeSort(rightArr);
//   merge(leftArr, rightArr);
// }

// function merge(leftArr, rightArr) {
//   let lengthLeft = initArray.length / 2;
//   let lengthRight = initArray.length - lengthLeft;
//   let i = 0,
//     j = 0,
//     k = 0;

//   while (i < lengthLeft && j < lengthRight) {
//     if (leftArr[i] <= rightArr[j]) {
//       initArray[k++] = leftArr[i++];
//     } else {
//       initArray[k++] = rightArr[j++];
//     }
//   }

//   while (i < lengthLeft) {
//     initArray[k++] = leftArr[i++];
//   }

//   while (j < lengthRight) {
//     initArray[k++] = rightArr[j++];
//   }
// }

/*********************************************************************************************************************
 * Event Listeners
 *********************************************************************************************************************/

/* This is an event listener that listens for the DOMContentLoaded event. When the DOMContentLoaded
event is fired, the initArray is initialized, the array is filled with random integers, and the bars
are created. */
document.addEventListener("DOMContentLoaded", () => {
  initArray = new Array(ARRAY_LENGTH);
  fillArray();
  createBars();
});

resetBtn.addEventListener("click", reset);
bubbleSortBtn.addEventListener("click", bubbleSort);
selectionSortBtn.addEventListener("click", selectionSort);
mergeSortBtn.addEventListener("click", mergeSortMain);
