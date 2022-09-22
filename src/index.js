const Game = require('./game');
const Board = require('./board');
const Unit = require('./unit');
const Player = require('./player');
const levels = require("./levels");

document.addEventListener('DOMContentLoaded', (e) => {
    let newGame = new Game(1);
    document.addEventListener("keydown", newGame.board.moveunit); 

    let endTurn = document.getElementById("end");
    endTurn.addEventListener("click", () => {
        newGame.board.savePositions();
        newGame.board.nextTurn();
        
    });

    let move = document.getElementById("move");
    move.addEventListener("click", () => {
        console.log("move");
    });

    let squares = document.getElementsByClassName("square");
    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener("mouseover", (e) => {
            console.log(e.target.id);
        });
    }   

    let units = document.getElementsByClassName("unit");
    
    
})  



