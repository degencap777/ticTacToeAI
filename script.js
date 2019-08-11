var orginalBoard;
const Player =  "O";
const AI = "X";
const WinCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const cells = document.querySelectorAll('.cell');
startGame();

function startGame(){
    document.querySelector(".endgame").style.display = "none";
    orginalBoard = Array.from(Array(9).keys());
    for(var i = 0; i< cells.length; i++){
        cells[i].innerText = "";
        cells[i].style.removeProperty("background-color");
        cells[i].addEventListener("click",turnClick, false)
    }
}

function turnClick(square){
    turn(square.target.id, Player);
}

function turn(squareID, player){
    orginalBoard[squareID] = player;
    document.getElementById(squareID).innerText =  player;
    let gameWon = checkWin(orginalBoard,player);
    if (gameWon) gameOver(gameWon);
}

function checkWin(board, player){
    let plays = board.reduce((a,e,i) => (e=== player) ? a.concat(i) : a, []);
    let gameWon = null;
    for(let [index, win] of WinCombos.entries()){

        if(win.every(elem=> plays.indexOf(elem)>-1)){
            gameWon =  {index: index, player:player};
            break;
        }
    }
    return gameWon;
}

function gameOver(gameWon){
    for(let index of WinCombos[gameWon.index]){
        document.getElementById(index).style.backgroundColor =
        gameWon.player == Player ? "blue" : "red";
    }

    for(var i =0; i< cells.length;i++){
        cells[i],removeEventListener("click", turnClick,false);
    }
}