let gridHeight = 16;
let gridWidth = 16;
let defaultColor = true;

const container = document.querySelector('.container');
const inputs = document.querySelector('.inputs');
const resetButton = document.querySelector('.reset');
const changeGridButton = document.querySelector('.changeGrid');
const randomColorButton = document.querySelector('.randomColor');
const heightInput = document.querySelector('.heightInput');
const widthInput = document.querySelector('.widthInput');
heightInput.defaultValue = gridHeight;
widthInput.defaultValue = gridWidth;
resetButton.addEventListener('click', resetGrid);
changeGridButton.addEventListener('click', changeGrid);
randomColorButton.addEventListener('click', () => {
    defaultColor = !defaultColor;
    console.log(defaultColor);
    colorMode();
})

// Set input filter to input boxes
setInputFilter(heightInput,function(value) {return /^\d*$/.test(value); });
setInputFilter(widthInput,function(value) {return /^\d*$/.test(value); });

//  Initial grid creation
createGrid(gridHeight*gridWidth);

//  Function to set grid height. Input: num - positive value
function setGridHeight(num) {
    gridHeight = num;
}

//  Function to set grid width. Input: num - positive value
function setGridWidth(num) {
    gridWidth = num;
}

//  Function to create grid and add event listener for each cell using recursion - can cause call stack overflow
/*  function createGrid(gridSize) {
    if (gridSize <= 0) {
        return;
    }
    else {
      let cell = document.createElement('div');
      cell.classList.add('box');
      cell.style.height = 100/gridHeight + '%';
      cell.style.width = 100/gridWidth + '%';
      cell.addEventListener('mouseover', () => {cell.classList.toggle('etched', true)});
      container.appendChild(cell);

      return createGrid(gridSize - 1);
    }
} */

//  Function to create grid and add event listener to etch for each cell using iteration
function createGrid(gridSize) {
    for (i = 1; i <= gridSize; i++) {
      let cell = document.createElement('div');
      cell.classList.add('box');
      cell.style.height = 100/gridHeight + '%';
      cell.style.width = 100/gridWidth + '%';
      
      container.appendChild(cell);
    }
    colorMode();
}

//  Clears coloring of cells in the current grid
function resetGrid() {
    let cells = document.querySelectorAll('.box');
    cells.forEach(cell => {cell.style.backgroundColor = ''});
    console.log("Cells cleared.");
}

//  Removes existing grid and creates new grid with new dimensions
function changeGrid() {
    let grid = document.querySelector('.container')
    while (grid.hasChildNodes()) {
        grid.removeChild(grid.firstChild);
    }
    setGridHeight(heightInput.value);
    console.log(gridHeight);
    setGridWidth(widthInput.value);
    console.log(gridWidth);  
    createGrid(gridHeight*gridWidth);
}

//  Function that returns random color hex
function randomColor() {
    return Math.floor(Math.random()*16777215).toString(16);
}

//  Event listener function to etch cell black
function etchBlack(e) {
    e.target.style.backgroundColor = 'black';
}

//  Event listener function to etch cell random color
function etchColor(e) {
    e.target.style.backgroundColor = randomColor();
}

//  Add/remove event listeners for etching
function colorMode() {
    let cells = document.querySelectorAll('.box');
    
    if (defaultColor) {
        cells.forEach(cell => {
            cell.removeEventListener('mouseover', etchColor);
            cell.addEventListener('mouseover', etchBlack);
        })
        randomColorButton.textContent = 'Color: Black'
    }
    else {
        cells.forEach(cell => {
            cell.removeEventListener('mouseover', etchBlack);
            cell.addEventListener('mouseover', etchColor);
        })
        randomColorButton.textContent = 'Color: Random'
    }    
}


// Restricts input for the given textbox to the given inputFilter. Function credits to emkey08
function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
        textbox.addEventListener(event, function() {
        if (inputFilter(this.value)) {
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
            this.value = this.oldValue;
            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        }
        });
    });
}

