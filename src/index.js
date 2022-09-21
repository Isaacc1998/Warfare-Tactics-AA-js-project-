const Game = require('./game');
const Board = require('./board');
const Unit = require('./unit');
const Player = require('./player');
const levels = require("./levels");

document.addEventListener('DOMContentLoaded', () => {
    let newGame = new Game(1);
    console.log("testing");
    document.addEventListener("keydown", newGame.board.moveunit);    
})  

module.exports = {
    function () {
        
    }
}


