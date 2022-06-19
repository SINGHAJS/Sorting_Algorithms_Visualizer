/**
 * Sorting Algorithm Visualizer
 *      @author Ajit Singh
 *
 */

/* array initialization */
const ARRAY_LENGTH = 80;
let initArray = new Array(ARRAY_LENGTH);

/* containers */
const displayContainer = document.getElementById("progress-display");

/* elements */
const comparisonsEl = document.getElementById("total-comparisons");
const timeTakenEl = document.getElementById("time-taken");

/* buttons */
const selectionSortBtn = document.getElementById("selection-sort");
const insertionSortBtn = document.getElementById("insertion-sort");
const bubbleSortBtn = document.getElementById("bubble-sort");
const mergeSortBtn = document.getElementById("merge-sort");
const quickSortBtn = document.getElementById("quick-sort");
const binSortBtn = document.getElementById("bin-sort");
const resetBtn = document.getElementById("reset");

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
    displayContainer.appendChild(bar);
  }
}

/**
 * It resets the array to its initial state, clears the display container, creates new bars, and resets
 * the comparisons and time taken elements
 */
const reset = () => {
  displayContainer.innerHTML = "";
  comparisonsEl.innerHTML = "0";
  timeTakenEl.innerHTML = "0 ms";
  fillArray(initArray);
  createBars(initArray);
};

/**
 * Sleep() returns a promise that resolves after a given time.
 * @param time - The time in milliseconds to wait before resolving the promise.
 * @returns A promise that will resolve after the given time.
 */
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

/**
 * It takes in an array of bars and changes their background color to green
 * @param bars - The array of bars that are being sorted.
 */
function markAsSorted(bars) {
  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "green";
  }
}

/**
 * It takes a time in milliseconds and sets the timeTakenEl element's innerHTML to the time in
 * milliseconds
 * @param time - The time taken to sort the array in milliseconds.
 */
function setTimeTaken(time) {
  timeTakenEl.innerHTML = `${time} ms`;
}

/**
 * It takes a value, and sets the innerHTML of the comparisonsEl element to that value
 * @param value - The value to set the comparisons to.
 */
function setComparisons(value) {
  comparisonsEl.innerHTML = value;
}

/*********************************************************************************************************************
 * Sorting Algorithms
 *********************************************************************************************************************/
/**
 * Selection Sort Algorithm
 */
async function selectionSort() {
  // initialization
  const bars = document.querySelectorAll(".bar");
  let minNum = 0;
  let minNumIndex = 0;
  let comparisons = 0;
  let startTime = window.performance.now();
  let endTime = 0;

  for (let i = 0; i < ARRAY_LENGTH - 1; i++) {
    // set minimum number to the array value at index i
    // set the minimum number index to that value
    minNum = initArray[i];
    minNumIndex = i;

    // check and compare number values of current index and next index
    for (let j = i + 1; j < ARRAY_LENGTH; j++) {
      if (initArray[j] < minNum) {
        // if the next index value is smaller than the current index value
        // change the minNum value to the next index value
        minNum = initArray[j];
        minNumIndex = j;
        // setting the positions and colors of the bars
        bars[j].style.backgroundColor = "red";
        // settings time of the algorithm
        endTime = window.performance.now();
        setTimeTaken(Math.floor(endTime - startTime));
        // setting the comparisons value of the algorithm
        setComparisons(++comparisons);
      }
    }

    // swap
    // change the current index value to the new minimum number (minNum)
    // change the next index value to the current index value
    initArray[minNumIndex] = initArray[i];
    initArray[i] = minNum;

    // setting the positions and colors of the bars
    bars[minNumIndex].style.height = `${initArray[i]}%`;
    bars[minNumIndex].style.backgroundColor = "green";
    bars[i].style.height = `${initArray[i]}%`;
    bars[i].style.backgroundColor = "green";

    await sleep(50);
  }

  // marking as sorted
  markAsSorted(bars);
}

/**
 * Insertion Sort Algorithm
 */
async function insertionSort() {
  // initialization
  const bars = document.querySelectorAll(".bar");
  let startTime = window.performance.now();
  let endTime = 0;
  let comparisons = 0;

  for (let i = 0; i < initArray.length; i++) {
    // settings the value of j to the current index i - 1
    let j = i - 1;
    // storing the value of the array at i to the current variable
    let current = initArray[i];
    // setting the bars of the color
    bars[i].style.backgroundColor = "red";

    // iterating until the j is >= 0 and the value of the array at j is greater than the current value
    while (j >= 0 && initArray[j] > current) {
      // setting the value of the initArray at j + 1 to the value at i
      initArray[j + 1] = initArray[j];
      // setting the height and color of the bars
      bars[j + 1].style.height = `${initArray[j]}%`;
      bars[j + 1].style.backgroundColor = "red";
      j--;

      await sleep(5);

      // setting the time taken of the algorithm
      endTime = window.performance.now();
      setTimeTaken(Math.floor(endTime - startTime));
      // setting the comparisons value of the algorithm
      setComparisons(++comparisons);
    }

    //setting the value of the initArray at index j+1 to the current value
    initArray[j + 1] = current;
    // setting the height of the bar accordingly
    bars[j + 1].style.height = `${current}%`;
  }

  // marking as sorted
  markAsSorted(bars);
}

/**
 * Bubble Sort Algorithm
 */
async function bubbleSort() {
  // variable initialization
  const bars = document.querySelectorAll(".bar");
  let startTime = window.performance.now();
  let endTime = 0;
  let comparisons = 0;

  for (let i = 0; i < ARRAY_LENGTH; i++) {
    for (let j = 0; j < ARRAY_LENGTH - i - 1; j++) {
      if (initArray[j] > initArray[j + 1]) {
        // swapping if the value at index j is greater than index j+1
        let temp = initArray[j];
        initArray[j] = initArray[j + 1];
        initArray[j + 1] = temp;
        // setting the height and color of the bar
        bars[j].style.height = `${initArray[j]}%`;
        bars[j].style.backgroundColor = "red";
        bars[j + 1].style.height = `${initArray[j + 1]}%`;
        bars[j + 1].style.backgroundColor = "red";

        // setting the time taken for the algorithm
        endTime = window.performance.now();
        setTimeTaken(Math.floor(endTime - startTime));
        // setting the comparison value of the algorithm
        setComparisons(++comparisons);
        await sleep(10);
      }
      // setting the background of the bars back to black
      bars[j].style.backgroundColor = "black";
      bars[j + 1].style.backgroundColor = "black";
    }
  }

  // marking as sorted
  markAsSorted(bars);
}

// async function mergeSortMain() {
//   mergeSort(initArray.sort(), 0, ARRAY_LENGTH - 1);
//   console.log(initArray);
// }

// async function mergeSort(array, indexLeft, indexRight) {
//   if (indexLeft >= indexRight) {
//     return;
//   }

//   let middle = indexLeft + Math.floor((indexRight - indexLeft) / 2);
//   mergeSort(array, indexLeft, middle);
//   mergeSort(array, middle + 1, indexRight);
//   merge(array, indexLeft, middle, indexRight);
// }

// async function merge(array, leftIndex, middle, rightIndex) {
//   // initialization
//   const bars = document.querySelectorAll(".bar");
//   let lengthLeft = middle - leftIndex + 1;
//   let lengthRight = rightIndex - middle;
//   let comparison = 0;
//   let startTime = window.performance.now();
//   let endTime = 0;

//   // temp left and right arrays
//   let leftArray = new Array(lengthLeft);
//   let rightArray = new Array(lengthRight);

//   // populating left array
//   for (let i = 0; i < lengthLeft; i++) {
//     leftArray[i] = array[leftIndex + i];
//   }

//   // populating right array
//   for (let j = 0; j < lengthRight; j++) {
//     rightArray[j] = array[middle + 1 + j];
//   }

//   let i = 0;
//   let j = 0;
//   let k = leftIndex;

//   // merging left and right arrays
//   while (i < lengthLeft && j < lengthRight) {
//     setComparisons(++comparison);
//     // if the value at left array is smaller than the value at right array,
//     // then the value at the left array is stored in the given array at the kth index
//     if (leftArray[i] <= rightArray[j]) {
//       array[k] = leftArray[i];
//       // setting the height and color of the bars
//       bars[k].style.height = `${leftArray[i]}%`;
//       bars[k].style.backgroundColor = "green";
//       i++;
//     } else {
//       // if the value at the left array is greater than the value at the right array,
//       // then the value at the right array is stored at in the given array at the kth index
//       array[k] = rightArray[j];
//       // setting the height and color of the bars
//       bars[k].style.height = `${rightArray[j]}%`;
//       bars[k].style.backgroundColor = "green";
//       j++;
//     }

//     await sleep(100);

//     k++;
//   }

//   // storing the remaining values from the left array
//   while (i < lengthLeft) {
//     array[k] = leftArray[i];
//     // setting the height and color of the bars
//     bars[k].style.height = `${leftArray[i]}%`;
//     bars[k].style.backgroundColor = "green";
//     i++;
//     k++;
//   }

//   // storing the remaining values from the right array
//   while (j < lengthRight) {
//     array[k] = rightArray[j];
//     // setting the height and color of the bars
//     bars[k].style.height = `${rightArray[j]}%`;
//     bars[k].style.backgroundColor = "green";
//     j++;
//     k++;
//   }

//   endTime = window.performance.now();
//   setTimeTaken(Math.floor(endTime - startTime));
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
selectionSortBtn.addEventListener("click", selectionSort);
insertionSortBtn.addEventListener("click", insertionSort);
bubbleSortBtn.addEventListener("click", bubbleSort);
// mergeSortBtn.addEventListener("click", mergeSortMain);
// quickSortBtn.addEventListener("click", quickSortMain);
