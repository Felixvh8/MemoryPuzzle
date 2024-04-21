let board;
let gameDiv;
let cardHoldLength = 1000;
let resolvingMatch = false;
let size = [5, 4];
let cellDivisions = [];
let shuffleSwitches = 50;
let icons = [];
let timeStarted = false;
let seconds = 0, minutes = 0;
const SAVE_KEY_SCORE = "MemoryPuzzleFastestTime";
let highscore = localStorage.getItem(SAVE_KEY_SCORE) == null ? 0 : localStorage.getItem(SAVE_KEY_SCORE);

window.onload = function() {
  initiateIcons();
  initialise();
}

function initialise() {
  gameDiv = document.getElementById("gameDiv");
  document.getElementById("highscore").innerHTML = `Fastest Time: ${highscore} seconds`;
  board = new Board(size);

  for (let i = 0; i < size[0] * size[1]; i++) {
    // Creates a new html element that is attached to a Cell object
    const newCell = document.createElement("div");

    // Adds a class for CSS manipulation and an id to match to a Cell object
    newCell.id = `div${i}`;
    newCell.classList.add("symbolCard");

    // Attaches an event listener and a reference to a cell object
    board.cells[i].gameCell = newCell;
    newCell.addEventListener("click", () => {
      startTimer();
      board.cells[i].clicked();
    });

    // Appends the card icon to the div and hides it
    const img = document.createElement("img");
    img.src = board.cells[i].symbol.src;
    img.id = `icon${i}`;
    img.classList.add("iconHidden");
    newCell.appendChild(img);

    // Adds the new cell to an array
    // This array is used to shuffle the divs into a random order
    cellDivisions.push(newCell);
  }

  cellDivisions = shuffleArray(cellDivisions);

  // In a separate loop to allow for shuffling of the divs
  for (const div of cellDivisions) {
    gameDiv.appendChild(div);
  }
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

// Shuffles an array
function shuffleArray(array) {
  for (let i = 0; i < shuffleSwitches; i++) {
    // Assigns two random positions to switch in the array
    let pos1 = Math.floor( Math.random() * array.length );
    let pos2 = Math.floor( Math.random() * array.length );

    // Switches the elements at the two random array positions
    [array[pos1], array[pos2]] = [array[pos2], array[pos1]];
  }
  return array;
}

function startTimer() {
  if (timeStarted) return;

  timeStarted = true;

  timerID = setInterval(timeUp, 100);
}

function timeUp() {
  seconds *= 10;
  seconds++;
  seconds = Math.round(seconds) / 10;

  document.getElementById("timer").innerHTML = Math.round(seconds) == seconds ? `${seconds}.0 seconds` : `${seconds} seconds`;
}