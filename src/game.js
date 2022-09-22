const Board = require('./board');
const Levels = require('./levels');
const Player = require('./player');
const Rifleman = require('./rifleman');
const Sniper = require('./sniper');
const AtGunner = require('./atGunner');
const Unit = require('./unit');

class Game {
    constructor (level) {
        this.board;
        if (level === 1) {
            let player = new Player('user');    
            let units = [new Rifleman("Bob", player), new Rifleman("Joe", player), new Sniper("Billy", player), new AtGunner("Joel", player)];
            let enemies = [new Rifleman("Enemy 1"), new Rifleman("Enemy 2"), new Sniper("Enemy 3"), new AtGunner("Enemy 4")];
            this.board = new Board(BATTLEFIELDS.levelOne, units, enemies, player);
            //this.board.render();
            this.runGame(this.board);
        }
    }

    runGame(board) {
        let context = board.battlefield; 
        function animate() {
            window.requestAnimationFrame(animate)
            board.render();
            //board.renderUnits();
        }
        animate();
    }
}

module.exports = Game;