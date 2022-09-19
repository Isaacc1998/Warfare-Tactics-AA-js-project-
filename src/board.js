const Player = require('./player');
const Unit = require('./unit');
const Levels = require('./levels');


class Board {
    constructor (grid, playerUnits, enemyUnits) {
        this.grid = grid;
        this.units = playerUnits;
        this.enemies = enemyUnits;
        this.unitOrder = this.setTurnOrder(this.units, this.enemies);
        this.currentTurn = 0;
        this.unitTurn = this.unitOrder[this.currentTurn];

        this.battlefield = this.draw(680, 680, "#111");
        this.statusScreen = this.draw(320, 400, "#300");
        this.moveScreen = this.draw(320, 280, "#5caaff")
        this.squareSize = 68;

        this.unitPositions = [];

        for (let i = 0; i < this.units.length; i++) {
            this.unitPositions.push();
        }

    }

    won() {

    }

    lost () {
        let status = this.units.every();
    }

    nextTurn() {
        this.currentTurn++;
    }

    setTurnOrder(units, enemies) {
        return this.shuffleArray(units.concat(enemies));
    }

    shuffleArray(array) {
        let i = array.length
        let rand = i;
        while (i >= 0) {
            rand = Math.floor(Math.random() * (i+1));
            let temp = array[i];
            array[i] = array[rand];
            array[rand] = temp;
            i--;
        } 
        return array;
    }

    draw(width, length, color) {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        this.canvas.width = width;
        this.canvas.length = length;
        return this.context;
    }

    render() {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                this.battlefield.fillStyle = "#000";
                this.battlefield.fillRect(j * this.squareSize, i * this.squareSize, this.squareSize, this.squareSize);

            }
        }
    }
};

module.exports = Board;
