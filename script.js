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
    if(typeof orginalBoard[square.target.id]== "number"){
        turn(square.target.id, Player);
        if(!checkTie()) turn(bestSpot(),AI);
    }
    
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
        cells[i].removeEventListener("click", turnClick,false);
    }

    declarewinner(gameWon.player== Player ? "You Win!" : "You  Lose!" );
    
}

// basic AI

//function used to change the endgame block depending 
//on the statement sent to it

function declarewinner(statment){
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = statment;
}

function emptylocation(){
    return orginalBoard.filter(s=> typeof s ==  "number");
}

function bestSpot(){
    return emptylocation()[0]; 
}

function checkTie(){
    if(emptylocation().length== 0){
        for (let i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor="green";
            cells[i].removeEventListener("click",turnClick,false);
        }
        declarewinner("Tie Game!");
        return true;
    }
    return false;
}