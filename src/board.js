const Player = require('./player');
const Unit = require('./unit');
const Levels = require('./levels');
let count = document.querySelector(".tCount");
let name = document.querySelector(".name");
class Board {
    //edit
    constructor (grid, playerUnits, enemyUnits) {
        this.grid = grid;
        //this.objectGrid = this.createObjectGrid();
        this.units = playerUnits;
        this.enemies = enemyUnits;
        this.characterKey = {};
        this.enemyNames = [];
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemyNames.push(this.enemies[i].name);
        }
        this.unitOrder = this.setTurnOrder();
        for (let i = 0; i < this.unitOrder.length; i++) {
            this.characterKey[this.unitOrder[i].name] = this.unitOrder[i];
        }
        console.log(this.characterKey);
        this.currentTurn = 0;
        this.unitTurn = this.unitOrder[this.currentTurn % this.unitOrder.length];
        this.unitGrid = new Array(10); 
        for (let i = 0; i < this.unitGrid.length; i++) {
            this.unitGrid[i] = new Array(10);
        }
        for (let i = 0; i < this.unitGrid.length; i++) {
            for (let j = 0; j < this.unitGrid[i].length; j++) {
                this.unitGrid[i][j] = 0;
            }
        }
        this.battlefield = this.drawBattlefield(0, 0, "#444");
		this.cellSize = 67;
		this.padding = 2;
        this.setPos();
        this.tiles = [];
        this.fillTiles();
        this.unitImages = [];
        this.generateUnitImages();
        //this.unitContexts = this.createUnitCanvas();
        this.generateHTMLsquares();  
        this.generateHTMLunits();
        this.currentMoveCount = this.unitTurn.move;

    }

    setCurrentMoveCount() {
        this.currentMoveCount = this.unitTurn.move;
    }

    attack(target) {
       let attackedUnit = this.characterKey[target];
        if (this.inRange(attackedUnit)) {
            console.log("before damge");
            attackedUnit.takeDamage(this.unitTurn.attack);
            if (!attackedUnit.isAlive()) {
                this.removeUnit(attackedUnit);
            }
        }
    }

    inRange(target) {
        let range = this.unitTurn.range;
        console.log(target);
        console.log(this.unitTurn);
        let xDif = target.pos[0] - this.unitTurn.pos[0];
        let yDif = target.pos[1] - this.unitTurn.pos[1];
        while (xDif !== 0) {
            if (xDif > 0) {
                xDif--;
                range--;
            } else if (xDif < 0) {
                xDif++;
                range--;
            }
        }

        while (yDif !== 0) {
            if (yDif > 0) {
                yDif--;
                range--;
            } else if (yDif < 0) {
                yDif++;
                range--;
            }
        }
        if (range < 0) {
            return false
        }
        return true;
    }

    findClickedUnit(name) {
        console.log(name);
        for (let i = 0; i < this.unitOrder.length; i++) {
            if (this.unitOrder[i].name === name) {
                let alliance;
                let type;
                if (this.unitOrder[i].owner === null) {
                    alliance = "Player 2"
                } else {
                    alliance = "Player 1"
                }
                if (this.unitOrder[i].type === "atGunner") {
                    type = "RPG"
                } else {
                    type = this.unitOrder[i].type;   
                }
                return [this.unitOrder[i].health, 
                        this.unitOrder[i].attack, 
                        this.unitOrder[i].defense,
                        this.unitOrder[i].name,
                        type,
                        alliance]
            }
        }
    }

    savePositions() {
        for (let row = 0; row < this.unitGrid.length; row++) {
			for (let col = 0; col < this.unitGrid[row].length; col++) {
                if (this.unitGrid[row][col] instanceof Unit) {
                    let unitClick = document.getElementById(`${this.unitGrid[row][col].name}`);
                    unitClick.style.top = row * (this.cellSize + this.padding); 
                    unitClick.style.left = col * (this.cellSize + this.padding); 
                }
            }
        }
    }

    generateUnitImages() {
        let rifleman = new Image();
        rifleman.src = "../soldiers/Hero_Rifle.png";
        this.unitImages.push(rifleman);

        let sniper = new Image();
        sniper.src = "../soldiers/Hero_MachineGun.png";
        this.unitImages.push(sniper);

        let launcher = new Image();
        launcher.src = "../soldiers/Hero_GrenadeLauncher.png";
        this.unitImages.push(launcher);
    }

    fillTiles() {
            let grass = new Image();
            grass.src = "../tiles/Tiles/_0003_GrassTiles.png";
            this.tiles.push(grass);

            let dirt = new Image();
            dirt.src = "../tiles/Tiles/_0001_DirtTiles.png";
            this.tiles.push(dirt);

            let crate = new Image();
            crate.src = "../tiles/crates/TDS04_0018_Box1.png";
            this.tiles.push(crate);
    }

    setPos() {
        for (let i = 0; i < this.units.length; i++) {
            this.units[i].setPiece([0, i+2]);
            this.unitGrid[0][i+2] = this.units[i];
        }

        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].setPiece([this.unitGrid.length-2, i+4]);
            this.unitGrid[this.unitGrid.length-2][i+4] = this.enemies[i];
        }
    }

    isValidMove(x, y) {
        if ((this.grid[this.unitTurn.pos[0] + y][this.unitTurn.pos[1] + x] === 0 || this.grid[this.unitTurn.pos[0] + y][this.unitTurn.pos[1] + x] === 1) && this.unitGrid[this.unitTurn.pos[0] + y][this.unitTurn.pos[1] + x] === 0) {
            return true;
        }
        //check starting position of units
        
		return false;
	}

    updateGrid(x, y, value) {
        this.unitGrid[x][y] = value;
    }

    moveunit = ( { keyCode } ) => {
		if (keyCode === 37) {
			if (this.isValidMove(-1, 0)) {
			 this.updateGrid(this.unitTurn.pos[0], this.unitTurn.pos[1], 0);
			 this.updateGrid(this.unitTurn.pos[0], this.unitTurn.pos[1] - 1, this.unitTurn);
			 this.unitTurn.pos[1] --;	
             this.currentMoveCount--; 
		 }
		} else if (keyCode === 39) {
			if (this.isValidMove(1, 0)) {
				this.updateGrid(this.unitTurn.pos[0], this.unitTurn.pos[1], 0);
 			 	this.updateGrid(this.unitTurn.pos[0], this.unitTurn.pos[1] + 1, this.unitTurn);
				this.unitTurn.pos[1] ++;
                this.currentMoveCount--; 

			}
		} else if (keyCode === 38) {
			if (this.isValidMove(0, -1)) {
				this.updateGrid(this.unitTurn.pos[0], this.unitTurn.pos[1], 0);
 			 	this.updateGrid(this.unitTurn.pos[0] - 1, this.unitTurn.pos[1], this.unitTurn);
				this.unitTurn.pos[0] --;
                this.currentMoveCount--; 

			}
		} else if (keyCode === 40) {
			if (this.isValidMove(0, 1)) {
				this.updateGrid(this.unitTurn.pos[0], this.unitTurn.pos[1], 0);
 			 	this.updateGrid(this.unitTurn.pos[0] + 1, this.unitTurn.pos[1], this.unitTurn);
				this.unitTurn.pos[0] ++;
                this.currentMoveCount--; 
			}
		}
        if (this.currentMoveCount === 0) {
            document.removeEventListener("keydown", this.moveunit);
            let counter = document.getElementById("moveCounter");
            counter.style.display = "none";
            //add moveOptions
            let moveOptions = document.getElementsByClassName("moveB");
            for (let i = 0; i < moveOptions.length; i++) {
                moveOptions[i].style.display = "block";
            }
            move.style.display = "none";
            return;
        }
        let counter = document.getElementById("moveCounter");
        counter.textContent = `Moves Left: ${this.currentMoveCount}`
        
	}

	getCenter(w, h) {
		return {
			x: window.innerWidth / 2 - w / 2 + "px",
			y: window.innerHeight / 2 - h / 2 + "px"
		};
	}

    createUnitCanvas() {
        let arr = [];
        for (let i = 0; i < this.unitOrder.length; i++) {
            let unit = document.createElement("canvas");
            unit.id = `${this.unitOrder[i].name}`;
            let unitContext = unit.getContext('2d');

            document.body.appendChild(unit); 
            let container = document.getElementById('container');
            container.appendChild(unit);
            arr.push(unitContext);
        }
        return arr;
    }

	drawBattlefield(w, h, color = "#949494") {
		this.canvas = document.createElement("canvas");
        this.canvas.id = "battle";
		this.context = this.canvas.getContext("2d");
		// this.canvas.style.width = 680;
        // this.canvas.style.height = 680;
        this.canvas.style.display = "inline-block"
		this.canvas.style.position = "relative";
		this.canvas.style.background = color;
        this.canvas.style.right = "190";
        this.canvas.style.bottom = "686";



		// if (isTransparent) {
		// 	this.canvas.style.backgroundColor = "transparent";
		// }

		// const center = this.getCenter(w, h);
		// this.canvas.style.marginLeft = center.x;
		// this.canvas.style.marginTop = center.y;
		// this.canvas.style.right = 720;
        
        document.body.appendChild(this.canvas); 
        let container = document.getElementById('container');
        container.appendChild(this.canvas);

		return this.context;
	}

    generateHTMLsquares() {
        for (let row = 0; row < this.grid.length; row++) {
			for (let col = 0; col < this.grid[row].length; col++) {
                let square = document.createElement('div');
                square.id = `${this.grid[row][col]}`;
                square.className = "square";
                square.style.position = "absolute";
                square.style.top = row * (this.cellSize + this.padding); 
                square.style.left = col * (this.cellSize + this.padding); 
                square.style.width = this.cellSize;
                square.style.height = this.cellSize;
                // document.body.appendChild(square); 
                square.style.zIndex = 100;
                // this.battlefield.canvas.appendChild(square);
                let squares = document.getElementById('squares');
                squares.appendChild(square);
            }
        }
    }

    generateHTMLunits() {
        for (let row = 0; row < this.unitGrid.length; row++) {
			for (let col = 0; col < this.unitGrid[row].length; col++) {
                if (this.unitGrid[row][col] instanceof Unit) {
                    let unitClick = document.createElement('div');
                    unitClick.id = `${this.unitGrid[row][col].name}`;
                    unitClick.className = "unit";
                    unitClick.style.position = "absolute";
                    unitClick.style.top = row * (this.cellSize + this.padding); 
                    unitClick.style.left = col * (this.cellSize + this.padding); 
                    unitClick.style.width = this.cellSize;
                    unitClick.style.height = this.cellSize;
                    unitClick.style.zIndex = 101;
                    let squares = document.getElementById('squares');
                    squares.appendChild(unitClick);
                }
            }
        }
    }
    

    // renderUnits() {
    //     for (let i = 0; i < this.unitOrder.length; i++) {
    //         let unitContext = this.unitContexts[i];

    //         const w = (this.cellSize + this.padding) * this.grid[0].length - (this.padding);
    //         const h = (this.cellSize + this.padding) * this.grid.length - (this.padding);

    //         unitContext.canvas.width = w;
    //         unitContext.canvas.height = h;

    //         const center = this.getCenter(w, h);
    //         unitContext.canvas.style.marginLeft = center.x
    //         unitContext.canvas.style.marginTop = center.y;

    //         let image;
    //         if (this.unitOrder[i].type === "rifleman") {
    //             image = this.unitImages[0];
    //         } else if (this.unitOrder[i].type === "sniper") {
    //             image = this.unitImages[1];
    //         } else if (this.unitOrder[i].type === "atGunner") {
    //             image = this.unitImages[2];
    //         }
            
    //         unitContext.drawImage(image, 8, 8, 48, 48, this.unitOrder[i].pos[1] * (this.cellSize + this.padding), this.unitOrder[i].pos[0] * (this.cellSize + this.padding), this.cellSize, this.cellSize);
    //     }
    // }

	render() {
		const w = (this.cellSize + this.padding) * this.grid[0].length - (this.padding);
		const h = (this.cellSize + this.padding) * this.grid.length - (this.padding);

		this.battlefield.canvas.width = w;
		this.battlefield.canvas.height = h;

		const center = this.getCenter(w, h);
		this.battlefield.canvas.style.marginLeft = center.x
		this.battlefield.canvas.style.marginTop = center.y;

		for (let row = 0; row < this.grid.length; row++) {
			for (let col = 0; col < this.grid[row].length; col++) {
				const val = this.grid[row][col];

                let image;
                let sx = 0;
                let sy = 0;
				if (val === 0) {
                    image = this.tiles[0];
                    sx = 144;
                    sy = 144;
				} else if (val === 1) {
					image = this.tiles[1];
                    sx = 144;
                    sy = 144;
				} else if(val === 3) {
                    image = this.tiles[2];
                    sx = 1;
                    sy = 0;
                } 
                
                //drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
                this.battlefield.drawImage(image, sx, sy, 30, 30, col * (this.cellSize + this.padding), row * (this.cellSize + this.padding), this.cellSize, this.cellSize);
                //create corresponding html box element
                //let boxElement = document.createElement('div');
                // this.battlefield.canvas.style.width = this.cellSize;
                // this.battlefield.canvas.style.height = this.cellSize;
                let x;
                let y;
                let image2;
                if (this.unitGrid[row][col] instanceof Unit) {
                    x = this.unitGrid[row][col].pos[1];
                    y = this.unitGrid[row][col].pos[0];
                        if (this.unitGrid[row][col].type === "rifleman") {
                            image2 = this.unitImages[0];
                        } else if (this.unitGrid[row][col].type === "sniper") {
                            image2 = this.unitImages[1];
                        } else if (this.unitGrid[row][col].type === "atGunner") {
                            image2 = this.unitImages[2];
                        }
                    this.battlefield.drawImage(image2, 8, 8, 48, 48, col * (this.cellSize + this.padding), row * (this.cellSize + this.padding), this.cellSize, this.cellSize)

                }
                // unitContext.drawImage(image, 8, 8, 48, 48, this.unitOrder[i].pos[1] * (this.cellSize + this.padding), this.unitOrder[i].pos[0] * (this.cellSize + this.padding), this.cellSize, this.cellSize);


				// this.battlefield.fillStyle = color;
				// this.battlefield.fillRect(col * (this.cellSize + this.padding),
				// row * (this.cellSize + this.padding),
				// this.cellSize, this.cellSize);
			}
		}
    }



    renderOptions() {
        let context = document.getElementById("");
        let button1 = document.createElement("button");
        let button2 = document.createElement("button");
        let button3 = document.createElement("button");
        let button4 = document.createElement("button");

        button1.class = "move";
        button2.class = "attack";
        button3.class = "items";
        button4.class = "defend";

        button1.style.display = "block";
    }



    draw(name) {
        let canvas = document.createElement("canvas");
        canvas.id = name; 
        let w = canvas.width;
        let h = canvas.height;
        let context = canvas.getContext("2d");
        document.body.appendChild(canvas);
        //canvas.style.display = "none";
        if (name === "moveOptions") {
            this.renderOptions();
        }
        return this.context;
    }

    drawSquare(x, y, w, h, color) {
        this.battlefieldContext.lineWidth = 1;
        this.battlefieldContext.fillStyle = color;
        this.battlefieldContext.fillRect(x, y, w, h);
        this.battlefieldContext.strokeRect(x, y, w, h);
    }

    drawGrid() {
        let x = 0;
        let y = 0;
        let w = this.squareSize;
        let h = this.squareSize;

        for(let i = 0; i < this.grid.length; i++) {
            for(let j = 0; j < this.grid.length; j++){
                if (this.grid[i][j] === 0) {
                    this.drawSquare(x, y, w, h, "#d3d3d2");
                } else {
                    this.drawSquare(x, y, w, h, "#111");
                }
                x += w;
            }
            y += h;
            x = 0;
        }
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
        //console.log(count, 'count')
        count.textContent = this.currentTurn + 1;
        //have to update unit turn, because constructor only called once 
        this.unitTurn = this.unitOrder[this.currentTurn % this.unitOrder.length];
        name.textContent = `${this.unitTurn.name}`; 


        if (this.unitTurn.type === null) {
            this.enemyAction();
        }
        this.gameEnd();
    }

    gameEnd() {
        if (this.currentTurn === 50) {
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
        let index = this.unitOrder.indexOf(unit);
        if (index > -1) {
            this.unitOrder.splice(index, 1);
        }
        let x = unit.pos[0];
        let y = unit.pos[1];
        this.unitGrid[x][y] = 0;
        if (unit.owner === null) {
            this.enemies.splice(this.enemies.indexOf(unit), 1);
        } else {
            this.units.splice(this.units.indexOf(unit), 1);
        }

        let deadUnit = document.getElementById(unit.name);
        deadUnit.remove();
        this.gameEnd();
        this.savePositions();
        this.nextTurn();
        this.setCurrentMoveCount();
        let move = document.getElementById("move");
        move.style.display = "block";
        let moveOptions = document.getElementsByClassName("moveB");
        for (let i = 0; i < moveOptions.length; i++) {
            moveOptions[i].style.display = "block";
        }
    }

    // attack(pos) {
    //     let x = pos[0];
    //     let y = pos[1];

    //     if (this.grid[x][y] instanceof Unit && this.grid[x][y].type === null) {
    //         this.grid[x][y].takeDamage(this.unitTurn.attack);
    //         if (this.grid[x][y].alive === false) {
    //             this.removeUnit(this.grid[x][y]);
    //         }
    //         return true;
    //     }
    //     return false;
    // }

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


    setTurnOrder() {
        let arr = []
        let unitCount = 0;
        let enemyCount = 0;
        for (let i = 0; i < this.units.length + this.enemies.length; i++) {
            if (i % 2 === 0) {
                arr.push(this.units[unitCount]);
                unitCount++;
            } else {
                arr.push(this.enemies[enemyCount]);
                enemyCount++;
            }
        }
        console.log(arr);
        return arr;
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
