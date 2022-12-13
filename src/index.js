const Game = require("./game");
// import Game from "./game";
const Board = require("./board");
// import Board from "./board.js";
const Unit = require("./unit");
// import Unit from "./unit";
const Player = require("./player");
const levels = require("./levels");
// const Tile =
//let clickedUnit = {hp: 0, atk: 0, def: 0, type: "", name: "", alliance: ""}
document.addEventListener("DOMContentLoaded", (e) => {
  let newGame = new Game(1);
  // let controller = new AbortController();
  // document.addEventListener("keydown", () => {

  // });

  let endTurn = document.getElementById("end");
  endTurn.addEventListener("click", () => {
    newGame.board.savePositions();
    newGame.board.nextTurn();
    newGame.board.setCurrentMoveCount();
    let move = document.getElementById("move");
    let attackText = document.getElementById("attackText");
    attackText.style.display = "none";
    move.style.display = "block";
    let moveOptions = document.getElementsByClassName("moveB");
    for (let i = 0; i < moveOptions.length; i++) {
      moveOptions[i].style.display = "block";
    }
  });

  let move = document.getElementById("move");
  move.addEventListener("click", () => {
    let moveOptions = document.getElementsByClassName("moveB");
    for (let i = 0; i < moveOptions.length; i++) {
      moveOptions[i].style.display = "none";
    }
    let counter = document.getElementById("moveCounter");
    counter.style.display = "block";
    counter.textContent = `Moves Left: ${newGame.board.currentMoveCount}`;
    document.addEventListener("keydown", newGame.board.moveunit);

    // if (newGame.board.currentMoveCount === 0) {
    //     //delete counter
    //     let counter = document.getElementById("moveCounter");
    //     counter.style.display = "none";
    //     //add moveOptions
    //     let moveOptions = document.getElementsByClassName("moveB");
    //     for (let i = 0; i < moveOptions.length; i++) {
    //         moveOptions[i].style.display = "block";
    //     }
    //     move.style.display = "none";
    // }
  });

  let squares = document.getElementsByClassName("square");
  for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener("mouseover", (e) => {
      console.log(e.target.id);
    });
  }

  let units = document.getElementsByClassName("unit");
  for (let i = 0; i < units.length; i++) {
    units[i].addEventListener("mouseover", (e) => {
      let stats = newGame.board.findClickedUnit(e.target.id);
      let info = document.getElementById("unitInfo");
      info.innerHTML = `HP: ${stats[0]}\n
                              <br>
                              ATK: ${stats[1]}\n
                              <br>
                              DEF: ${stats[2]}\n
                              <br>
                              <br>
                              Name: ${stats[3]}\n
                              <br>
                              Type: ${stats[4]}\n
                              <br>
                              Alliance: ${stats[5]}`;
    });
  }

  let attack = document.getElementById("attack");
  attack.addEventListener("click", () => {
    let moveOptions = document.getElementsByClassName("moveB");
    for (let i = 0; i < moveOptions.length; i++) {
      moveOptions[i].style.display = "none";
    }

    let attackText = document.getElementById("attackText");
    attackText.style.display = "block";

    let units = document.getElementsByClassName("unit");
    for (let i = 0; i < units.length; i++) {
      units[i].addEventListener("click", (e) => {
        if (
          newGame.board.enemyNames.includes(e.target.id) &&
          newGame.board.unitTurn.owner !== null
        ) {
          newGame.board.attack(e.target.id);
          newGame.board.savePositions();
          newGame.board.nextTurn();
          newGame.board.setCurrentMoveCount();
          let move = document.getElementById("move");
          move.style.display = "block";
          let attackText = document.getElementById("attackText");
          attackText.style.display = "none";
          for (let i = 0; i < moveOptions.length; i++) {
            moveOptions[i].style.display = "block";
          }
        }
      });
    }
  });
});
