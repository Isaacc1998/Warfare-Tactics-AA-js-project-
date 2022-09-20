const Player = require('./player');
const Unit = require('./unit');
const Levels = require('./levels');

class Board {
    constructor (grid, playerUnits, enemyUnits) {
        this.grid = grid;
        //this.objectGrid = this.createObjectGrid();
        this.units = playerUnits;
        this.enemies = enemyUnits;
        this.unitOrder = this.setTurnOrder(this.units, this.enemies);
        this.currentTurn = 0;
        this.unitTurn = this.unitOrder[this.currentTurn % this.unitOrder.length];
        
        // this.battlefield = document.createElement("canvas");
        // this.battlefield.id = "battlefield";
        // this.battlefieldContext = this.battlefield.getContext('2d');
        //this.battlefield = this.draw("battlefield");
        this.statusScreen = this.draw("status");
        this.moveScreen = this.draw("moveOption");
        //this.drawGrid();
        //this.squareSize = 67;
        this.battlefield = this.drawBattlefield(0, 0, "#444");
		this.cellSize = 67;
		this.padding = 2;
        this.setPos();
        this.unitX = 1;
        this.unitY = 1;
		this.unit = { x: this.unitX, y: this.unitY, color: "yellow" };
		this.grid[this.unitY][this.unitX] = this.unitTurn;

    }

    setPos() {
        for (let i = 0; i < this.units.length; i++) {
            this.units[i].setPiece([i+1, 0]);
            this.grid[i+1][1] = this.units[i];
        }

        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].setPiece([i+1, this.grid.length-1]);
            this.grid[i+1][this.grid.length-1] = this.enemies[i];
        }
    }

    isValidMove(x, y) {
		if (this.grid[this.unit.y + y][this.unit.x + x] === 0) {
			return true;
		}
		return false;
	}

	updateGrid(y, x, val) {
		this.grid[y][x] = val;
	}

	moveunit = ( { keyCode } ) => {
		if (keyCode === 37) {
			if (this.isValidMove(-1, 0)) {
			 this.updateGrid(this.unit.y, this.unit.x, 0);
			 this.updateGrid(this.unit.y, this.unit.x - 1, this.unitTurn);
			 this.unit.x --;
			 this.render();
		 }
		} else if (keyCode === 39) {
			if (this.isValidMove(1, 0)) {
				this.updateGrid(this.unit.y, this.unit.x, 0);
 			 	this.updateGrid(this.unit.y, this.unit.x + 1, this.unitTurn);
				this.unit.x ++;
				this.render();
			}
		} else if (keyCode === 38) {
			if (this.isValidMove(0, -1)) {
				this.updateGrid(this.unit.y, this.unit.x, 0);
 			 	this.updateGrid(this.unit.y - 1, this.unit.x, this.unitTurn);
				this.unit.y --;
				this.render();
			}
		} else if (keyCode === 40) {
			if (this.isValidMove(0, 1)) {
				this.updateGrid(this.unit.y, this.unit.x, 0);
 			 	this.updateGrid(this.unit.y + 1, this.unit.x, this.unitTurn);
				this.unit.y ++;
				this.render();
			}
		}
	}

	getCenter(w, h) {
		return {
			x: window.innerWidth / 2 - w / 2 + "px",
			y: window.innerHeight / 2 - h / 2 + "px"
		};
	}

	drawBattlefield(w, h, color = "#949494", isTransparent = false) {
		this.canvas = document.createElement("canvas");
		this.context = this.canvas.getContext("2d");
		this.width = this.canvas.width = w;
		this.height = this.canvas.height = h;
		this.canvas.style.position = "absolute";
		this.canvas.style.background = color;

		if (isTransparent) {
			this.canvas.style.backgroundColor = "transparent";
		}

		const center = this.getCenter(w, h);
		this.canvas.style.marginLeft = center.x
		this.canvas.style.marginTop = center.y;
		this.canvas.style.right = 720;

		document.body.appendChild(this.canvas);

		return this.context;
	}

	render() {
		const w = (this.cellSize + this.padding) * this.grid[0].length - (this.padding);
		const h = (this.cellSize + this.padding) * this.grid.length - (this.padding);

		this.battlefield.canvas.width = w;
		this.battlefield.canvas.height = h;

		const center = this.getCenter(w, h);
		this.battlefield.canvas.style.marginLeft = center.x
		this.battlefield.canvas.style.marginTop = center.y;

		for (let row = 0; row < this.grid.length; row ++) {
			for (let col = 0; col < this.grid[row].length; col ++) {
				const cellVal = this.grid[row][col];
				let color = "#D3D3D3";

				if (cellVal === 1) {
					color = "#111";
				} else if (cellVal instanceof Unit) {
					color = this.unit.color;
				}

				this.battlefield.fillStyle = color;
				this.battlefield.fillRect(col * (this.cellSize + this.padding),
				row * (this.cellSize + this.padding),
				this.cellSize, this.cellSize);
			}
		}
	}



    draw(name) {
        let canvas = document.createElement("canvas");
        canvas.id = name; 
        let w = canvas.width;
        let h = canvas.height;
        let context = canvas.getContext("2d");
        document.body.appendChild(canvas);

        return this.context;
    }

    // drawSquare(x, y, w, h, color) {
    //     this.battlefieldContext.lineWidth = 1;
    //     this.battlefieldContext.fillStyle = color;
    //     this.battlefieldContext.fillRect(x, y, w, h);
    //     this.battlefieldContext.strokeRect(x, y, w, h);
    // }

    // drawGrid() {
    //     let x = 0;
    //     let y = 0;
    //     let w = this.squareSize;
    //     let h = this.squareSize;

    //     for(let i = 0; i < this.grid.length; i++) {
    //         for(let j = 0; j < this.grid.length; j++){
    //             if (this.grid[i][j] === 0) {
    //                 this.drawSquare(x, y, w, h, "#d3d3d2");
    //             } else {
    //                 this.drawSquare(x, y, w, h, "#111");
    //             }
    //             x += w;
    //         }
    //         y += h;
    //         x = 0;
    //     }
    // }

    playerAction() {
        
    }

    enemyAction() {
        //ai functionality
        //has to click end turn button
    }

    nextTurn() {
        if (this.gameEnd()) {
            //victory or loss screen
        }
        this.currentTurn++;
        if (this.unitTurn.type === null) {
            this.enemyAction();
        }
    }

    gameEnd() {
        if (this.currentTurn === 9) {
            console.log("You lose!")
            return true;
        }

        if (this.won()) {
            console.log("You win!")
            return true;
        } else if (this.lost()) {
            console.log("You lose!")
            return true;
        } 
        return false;
    }

    removeUnit(unit) {
        index = this.unitOrder.indexOf(unit);
        if (index > -1) {
            array.splice(index, 1);
        }
        let x = unit.pos[0];
        let y = unit.pos[1];
        this.grid[x][y] = 0;

        if (unit.type === null) {
            array.splice(this.enemies.indexOf(unit), 1);
        } else {
            array.splice(this.units.indexOf(unit), 1);
        }
    }

    attack(pos) {
        let x = pos[0];
        let y = pos[1];

        if (this.grid[x][y] instanceof Unit && this.grid[x][y].type === null) {
            this.grid[x][y].takeDamage(this.unitTurn.attack);
            if (this.grid[x][y].alive === false) {
                this.removeUnit(this.grid[x][y]);
            }
            return true;
        }
        return false;
    }

    moveUnit(pos) {
        let x = pos[0];
        let y = pos[1];
        let current = this.unitTurn.pos;
        let newPos = [current[0] + x, current[1] + y];
        if (this.validMove(newPos)) {
            this.unitTurn.move(newPos);
            if (this.unitTurn.owner != null) {
                this.grid[newPos[0]][newPos[1]] = this.unitTurn;
            } 
            return true; 
        }
        return false;
    }

    validMove(pos) {
        let x = pos[0];
        let y = pos[1];
        if (x > 9 || x < 0 || y > 9 || y < 0) {
            return false;
        } 
        if (this.grid[x][y] !== 1 || this.grid[x][y] !== 0) {
            return false;
        }
        return true;
    }

    won() {
        if (this.enemies.length === 0) {
            return true;
        }
        return false;
    }

    lost() {
        if (this.units.length === 0) {
            return true;
        }
        return false;
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

    

    renderStatus() {
        
    }

    renderOptions() {
        let canvas = document.getElementById("moveOption");
        canvas.innerHTML();
        
    }

    createBoard() {

    }

    // createObjectGrid() {
    //     let newGrid = [...Array(10)].map(e => Array(10));
    //     for (let i = 0; i < this.grid.length; i++) {
    //         for (let j = 0; j < this.grid.length; j++) {
    //             if (this.grid[i][j] === 0) {
    //                 newGrid[i][j].push(new Plain());
    //             } else if (this.grid[i][j] === 1) {
    //                 newGrid[i][j].push(new Wall());
    //             } else if (this.grid[i][j] === 2) {
    //                 newGrid[i][j].push();
    //             } else if (this.grid[i][j] === 3) {
    //                 newGrid[i][j].push();
    //             } else if (this.grid[i][j] === 4) {
    //                 newGrid[i][j].push();
    //             } else {
    //                 newGrid[i][j].push();
    //             }
    //         }
    //     }
    //     return newGrid;
    // }
};



module.exports = Board;
