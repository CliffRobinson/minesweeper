document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  width:6,
  height:6,
  cells: 
    [
      /*{row: 0, col: 0, isMine:false , hidden:true},
      {row: 1, col: 0, isMine:true  , hidden:true},
      {row: 0, col: 1, isMine:false , hidden:true},
      {row: 1, col: 1, isMine:false , hidden:true}*/
    ],
};

function populateBoard(board){
  for (let i = 0;i<board.width;i++){
    for (let j = 0;j<board.height;j++){
      let newCell = {row:i, col:j,isMine:false, hidden:true};
      if (Math.random() >= 0.75/*25% chance*/){
        newCell.isMine = true;
      }
      //console.log("Pushing:" +newCell);
      board.cells.push(newCell);
    }
  }
}
function startGame () {
  // Don't remove this function call: it makes the game work!
  populateBoard(board);
  labelSurroundingMines();
  lib.initBoard()

  document.getElementsByClassName('board')[0].addEventListener('click',checkForWin);
  document.getElementsByClassName('board')[0].addEventListener('contextmenu',checkForWin);
  //console.log("Length of cells is: "+board.cells.length);
  document.getElementsByClassName('board')[0].addEventListener('click', checkForLoss);
  document.getElementsByClassName('board')[0].addEventListener('contextmenu',checkForLoss);
  document.getElementsByTagName('button')[0].addEventListener('click', resetBoard);
}

function labelSurroundingMines() {
  for (let i=0;i<board.cells.length;i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }
}


// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  for (let i=0;i<board.cells.length;i++) {
    //console.log("Checking Cell: "+i+", Mine is "+board.cells[i].isMine+", Marked is "+ board.cells[i].isMarked);
    if (board.cells[i].isMine == true && board.cells[i].isMarked != true){
      //console.log("You haven't won yet");
      return;
    } 
  }
  //console.log("-----");
  for (let i=0;i<board.cells.length;i++) { 
    //console.log("Checking Cell: "+i+", hidden is: "+board.cells[i].hidden);
    if (board.cells[i].hidden == true && board.cells[i].isMine == false){
      return;
    }
  }
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  lib.displayMessage('You win!')
  document.getElementById('clap').play();
  console.log('should reveal de button now');
  revealButton();
  //resetBoard();
}

function checkForLoss() {
  for (let i = 0;i<board.cells.length;i++) {
      /*if hidden!=true and isMine==true, offer the chance to restart.*/
      
      if (board.cells[i].isMine == true && board.cells[i].hidden == false){
        //alert("You have lost.");
        console.log('Should reveal ze button now');
        document.getElementById('kaboom').play();
        revealButton();
        //resetBoard();
      }
  }
}


function revealButton() {
  //console.log(document.getElementsByClassName('restart')[0].classList);
  document.getElementsByClassName('restart')[0].classList.remove('invisible');
  //console.log(document.getElementsByClassName('restart')[0].classList);
}

function hideButton(){
  document.getElementsByClassName('restart')[0].classList.add('invisible');
}

function resetBoard() {
  //if (confirm("Would you like to play again?")){
    document.getElementsByClassName('board')[0].innerHTML = '';
    let newBoard = {
      width:board.width,
      height:board.height,
      cells: [],
    }

    board = newBoard;

    startGame();
    hideButton();
  //}
}



// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  let i = 0;
  let surroudingCells = getSurroundingCells(cell.row, cell.col);

  for (let j = 0;j<surroudingCells.length;j++){
    if (surroudingCells[j].isMine == true) {
      i++;
    }
  }
  
  return i;
}

