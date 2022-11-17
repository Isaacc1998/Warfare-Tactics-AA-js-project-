!(function () {
  var t = {
      782: function (t, e, i) {
        const n = i(721);
        t.exports = class extends n {
          constructor(t) {
            let e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            super("atGunner", 11, 8, 1, 3, 2),
              (this.name = t),
              (this.owner = e);
          }
        };
      },
      386: function (t, e, i) {
        i(285);
        const n = i(721);
        i(602);
        let s = document.querySelector(".tCount"),
          r = document.querySelector(".name");
        t.exports = class {
          constructor(t, e, i) {
            var n, s;
            (s = (t) => {
              let { keyCode: e } = t;
              if (
                (37 === e
                  ? this.isValidMove(-1, 0) &&
                    (this.updateGrid(
                      this.unitTurn.pos[0],
                      this.unitTurn.pos[1],
                      0
                    ),
                    this.updateGrid(
                      this.unitTurn.pos[0],
                      this.unitTurn.pos[1] - 1,
                      this.unitTurn
                    ),
                    this.unitTurn.pos[1]--,
                    this.currentMoveCount--)
                  : 39 === e
                  ? this.isValidMove(1, 0) &&
                    (this.updateGrid(
                      this.unitTurn.pos[0],
                      this.unitTurn.pos[1],
                      0
                    ),
                    this.updateGrid(
                      this.unitTurn.pos[0],
                      this.unitTurn.pos[1] + 1,
                      this.unitTurn
                    ),
                    this.unitTurn.pos[1]++,
                    this.currentMoveCount--)
                  : 38 === e
                  ? this.isValidMove(0, -1) &&
                    (this.updateGrid(
                      this.unitTurn.pos[0],
                      this.unitTurn.pos[1],
                      0
                    ),
                    this.updateGrid(
                      this.unitTurn.pos[0] - 1,
                      this.unitTurn.pos[1],
                      this.unitTurn
                    ),
                    this.unitTurn.pos[0]--,
                    this.currentMoveCount--)
                  : 40 === e &&
                    this.isValidMove(0, 1) &&
                    (this.updateGrid(
                      this.unitTurn.pos[0],
                      this.unitTurn.pos[1],
                      0
                    ),
                    this.updateGrid(
                      this.unitTurn.pos[0] + 1,
                      this.unitTurn.pos[1],
                      this.unitTurn
                    ),
                    this.unitTurn.pos[0]++,
                    this.currentMoveCount--),
                0 !== this.currentMoveCount)
              )
                document.getElementById(
                  "moveCounter"
                ).textContent = `Moves Left: ${this.currentMoveCount}`;
              else {
                document.removeEventListener("keydown", this.moveunit),
                  (document.getElementById("moveCounter").style.display =
                    "none");
                let t = document.getElementsByClassName("moveB");
                for (let e = 0; e < t.length; e++) t[e].style.display = "block";
                move.style.display = "none";
              }
            }),
              (n = "moveunit") in this
                ? Object.defineProperty(this, n, {
                    value: s,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (this[n] = s),
              (this.grid = t),
              (this.units = e),
              (this.enemies = i),
              (this.characterKey = {}),
              (this.enemyNames = []);
            for (let t = 0; t < this.enemies.length; t++)
              this.enemyNames.push(this.enemies[t].name);
            this.unitOrder = this.setTurnOrder();
            for (let t = 0; t < this.unitOrder.length; t++)
              this.characterKey[this.unitOrder[t].name] = this.unitOrder[t];
            console.log(this.characterKey),
              (this.currentTurn = 0),
              (this.unitTurn =
                this.unitOrder[this.currentTurn % this.unitOrder.length]),
              (this.unitGrid = new Array(10));
            for (let t = 0; t < this.unitGrid.length; t++)
              this.unitGrid[t] = new Array(10);
            for (let t = 0; t < this.unitGrid.length; t++)
              for (let e = 0; e < this.unitGrid[t].length; e++)
                this.unitGrid[t][e] = 0;
            (this.battlefield = this.drawBattlefield(0, 0, "#444")),
              (this.cellSize = 67),
              (this.padding = 2),
              this.setPos(),
              (this.tiles = []),
              this.fillTiles(),
              (this.unitImages = []),
              this.generateUnitImages(),
              this.generateHTMLsquares(),
              this.generateHTMLunits(),
              (this.currentMoveCount = this.unitTurn.move);
          }
          setCurrentMoveCount() {
            this.currentMoveCount = this.unitTurn.move;
          }
          attack(t) {
            let e = this.characterKey[t];
            this.inRange(e) &&
              (console.log("before damge"),
              e.takeDamage(this.unitTurn.attack),
              e.isAlive() || this.removeUnit(e));
          }
          inRange(t) {
            let e = this.unitTurn.range;
            console.log(t), console.log(this.unitTurn);
            let i = t.pos[0] - this.unitTurn.pos[0],
              n = t.pos[1] - this.unitTurn.pos[1];
            for (; 0 !== i; ) i > 0 ? (i--, e--) : i < 0 && (i++, e--);
            for (; 0 !== n; ) n > 0 ? (n--, e--) : n < 0 && (n++, e--);
            return !(e < 0);
          }
          findClickedUnit(t) {
            console.log(t);
            for (let e = 0; e < this.unitOrder.length; e++)
              if (this.unitOrder[e].name === t) {
                let t, i;
                return (
                  (t =
                    null === this.unitOrder[e].owner ? "Player 2" : "Player 1"),
                  (i =
                    "atGunner" === this.unitOrder[e].type
                      ? "RPG"
                      : this.unitOrder[e].type),
                  [
                    this.unitOrder[e].health,
                    this.unitOrder[e].attack,
                    this.unitOrder[e].defense,
                    this.unitOrder[e].name,
                    i,
                    t,
                  ]
                );
              }
          }
          savePositions() {
            for (let t = 0; t < this.unitGrid.length; t++)
              for (let e = 0; e < this.unitGrid[t].length; e++)
                if (this.unitGrid[t][e] instanceof n) {
                  let i = document.getElementById(
                    `${this.unitGrid[t][e].name}`
                  );
                  (i.style.top = t * (this.cellSize + this.padding)),
                    (i.style.left = e * (this.cellSize + this.padding));
                }
          }
          generateUnitImages() {
            let t = new Image();
            (t.src = "../soldiers/Hero_Rifle.png"), this.unitImages.push(t);
            let e = new Image();
            (e.src = "../soldiers/Hero_MachineGun.png"),
              this.unitImages.push(e);
            let i = new Image();
            (i.src = "../soldiers/Hero_GrenadeLauncher.png"),
              this.unitImages.push(i);
          }
          fillTiles() {
            let t = new Image();
            (t.src = "../tiles/Tiles/_0003_GrassTiles.png"), this.tiles.push(t);
            let e = new Image();
            (e.src = "../tiles/Tiles/_0001_DirtTiles.png"), this.tiles.push(e);
            let i = new Image();
            (i.src = "../tiles/crates/TDS04_0018_Box1.png"), this.tiles.push(i);
          }
          setPos() {
            for (let t = 0; t < this.units.length; t++)
              this.units[t].setPiece([0, t + 2]),
                (this.unitGrid[0][t + 2] = this.units[t]);
            for (let t = 0; t < this.enemies.length; t++)
              this.enemies[t].setPiece([this.unitGrid.length - 2, t + 4]),
                (this.unitGrid[this.unitGrid.length - 2][t + 4] =
                  this.enemies[t]);
          }
          isValidMove(t, e) {
            return (
              (0 ===
                this.grid[this.unitTurn.pos[0] + e][this.unitTurn.pos[1] + t] ||
                1 ===
                  this.grid[this.unitTurn.pos[0] + e][
                    this.unitTurn.pos[1] + t
                  ]) &&
              0 ===
                this.unitGrid[this.unitTurn.pos[0] + e][
                  this.unitTurn.pos[1] + t
                ]
            );
          }
          updateGrid(t, e, i) {
            this.unitGrid[t][e] = i;
          }
          getCenter(t, e) {
            return {
              x: window.innerWidth / 2 - t / 2 + "px",
              y: window.innerHeight / 2 - e / 2 + "px",
            };
          }
          createUnitCanvas() {
            let t = [];
            for (let e = 0; e < this.unitOrder.length; e++) {
              let i = document.createElement("canvas");
              i.id = `${this.unitOrder[e].name}`;
              let n = i.getContext("2d");
              document.body.appendChild(i),
                document.getElementById("container").appendChild(i),
                t.push(n);
            }
            return t;
          }
          drawBattlefield(t, e) {
            let i =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : "#949494";
            return (
              (this.canvas = document.createElement("canvas")),
              (this.canvas.id = "battle"),
              (this.context = this.canvas.getContext("2d")),
              (this.canvas.style.display = "inline-block"),
              (this.canvas.style.position = "relative"),
              (this.canvas.style.background = i),
              (this.canvas.style.right = "190"),
              (this.canvas.style.bottom = "686"),
              document.body.appendChild(this.canvas),
              document.getElementById("container").appendChild(this.canvas),
              this.context
            );
          }
          generateHTMLsquares() {
            for (let t = 0; t < this.grid.length; t++)
              for (let e = 0; e < this.grid[t].length; e++) {
                let i = document.createElement("div");
                (i.id = `${this.grid[t][e]}`),
                  (i.className = "square"),
                  (i.style.position = "absolute"),
                  (i.style.top = t * (this.cellSize + this.padding)),
                  (i.style.left = e * (this.cellSize + this.padding)),
                  (i.style.width = this.cellSize),
                  (i.style.height = this.cellSize),
                  (i.style.zIndex = 100),
                  document.getElementById("squares").appendChild(i);
              }
          }
          generateHTMLunits() {
            for (let t = 0; t < this.unitGrid.length; t++)
              for (let e = 0; e < this.unitGrid[t].length; e++)
                if (this.unitGrid[t][e] instanceof n) {
                  let i = document.createElement("div");
                  (i.id = `${this.unitGrid[t][e].name}`),
                    (i.className = "unit"),
                    (i.style.position = "absolute"),
                    (i.style.top = t * (this.cellSize + this.padding)),
                    (i.style.left = e * (this.cellSize + this.padding)),
                    (i.style.width = this.cellSize),
                    (i.style.height = this.cellSize),
                    (i.style.zIndex = 101),
                    document.getElementById("squares").appendChild(i);
                }
          }
          render() {
            const t =
                (this.cellSize + this.padding) * this.grid[0].length -
                this.padding,
              e =
                (this.cellSize + this.padding) * this.grid.length -
                this.padding;
            (this.battlefield.canvas.width = t),
              (this.battlefield.canvas.height = e);
            const i = this.getCenter(t, e);
            (this.battlefield.canvas.style.marginLeft = i.x),
              (this.battlefield.canvas.style.marginTop = i.y);
            for (let t = 0; t < this.grid.length; t++)
              for (let e = 0; e < this.grid[t].length; e++) {
                const i = this.grid[t][e];
                let s,
                  r,
                  l,
                  o,
                  h = 0,
                  u = 0;
                0 === i
                  ? ((s = this.tiles[0]), (h = 144), (u = 144))
                  : 1 === i
                  ? ((s = this.tiles[1]), (h = 144), (u = 144))
                  : 3 === i && ((s = this.tiles[2]), (h = 1), (u = 0)),
                  this.battlefield.drawImage(
                    s,
                    h,
                    u,
                    30,
                    30,
                    e * (this.cellSize + this.padding),
                    t * (this.cellSize + this.padding),
                    this.cellSize,
                    this.cellSize
                  ),
                  this.unitGrid[t][e] instanceof n &&
                    ((r = this.unitGrid[t][e].pos[1]),
                    (l = this.unitGrid[t][e].pos[0]),
                    "rifleman" === this.unitGrid[t][e].type
                      ? (o = this.unitImages[0])
                      : "sniper" === this.unitGrid[t][e].type
                      ? (o = this.unitImages[1])
                      : "atGunner" === this.unitGrid[t][e].type &&
                        (o = this.unitImages[2]),
                    this.battlefield.drawImage(
                      o,
                      8,
                      8,
                      48,
                      48,
                      e * (this.cellSize + this.padding),
                      t * (this.cellSize + this.padding),
                      this.cellSize,
                      this.cellSize
                    ));
              }
          }
          renderOptions() {
            document.getElementById("");
            let t = document.createElement("button"),
              e = document.createElement("button"),
              i = document.createElement("button"),
              n = document.createElement("button");
            (t.class = "move"),
              (e.class = "attack"),
              (i.class = "items"),
              (n.class = "defend"),
              (t.style.display = "block");
          }
          draw(t) {
            let e = document.createElement("canvas");
            return (
              (e.id = t),
              e.width,
              e.height,
              e.getContext("2d"),
              document.body.appendChild(e),
              "moveOptions" === t && this.renderOptions(),
              this.context
            );
          }
          drawSquare(t, e, i, n, s) {
            (this.battlefieldContext.lineWidth = 1),
              (this.battlefieldContext.fillStyle = s),
              this.battlefieldContext.fillRect(t, e, i, n),
              this.battlefieldContext.strokeRect(t, e, i, n);
          }
          drawGrid() {
            let t = 0,
              e = 0,
              i = this.squareSize,
              n = this.squareSize;
            for (let s = 0; s < this.grid.length; s++) {
              for (let r = 0; r < this.grid.length; r++)
                0 === this.grid[s][r]
                  ? this.drawSquare(t, e, i, n, "#d3d3d2")
                  : this.drawSquare(t, e, i, n, "#111"),
                  (t += i);
              (e += n), (t = 0);
            }
          }
          enemyAction() {}
          nextTurn() {
            this.gameEnd(),
              this.currentTurn++,
              (s.textContent = this.currentTurn + 1),
              (this.unitTurn =
                this.unitOrder[this.currentTurn % this.unitOrder.length]),
              (r.textContent = `${this.unitTurn.name}`),
              null === this.unitTurn.type && this.enemyAction(),
              this.gameEnd();
          }
          gameEnd() {
            return 50 === this.currentTurn
              ? (console.log("You lose!"), !0)
              : this.won()
              ? (console.log("You win!"), !0)
              : !!this.lost() && (console.log("You lose!"), !0);
          }
          removeUnit(t) {
            let e = this.unitOrder.indexOf(t);
            e > -1 && this.unitOrder.splice(e, 1);
            let i = t.pos[0],
              n = t.pos[1];
            (this.unitGrid[i][n] = 0),
              null === t.owner
                ? this.enemies.splice(this.enemies.indexOf(t), 1)
                : this.units.splice(this.units.indexOf(t), 1),
              document.getElementById(t.name).remove(),
              this.gameEnd(),
              this.savePositions(),
              this.nextTurn(),
              this.setCurrentMoveCount(),
              (document.getElementById("move").style.display = "block");
            let s = document.getElementsByClassName("moveB");
            for (let t = 0; t < s.length; t++) s[t].style.display = "block";
          }
          moveUnit(t) {
            let e = t[0],
              i = t[1],
              n = this.unitTurn.pos,
              s = [n[0] + e, n[1] + i];
            return (
              !!this.validMove(s) &&
              (this.unitTurn.move(s),
              null != this.unitTurn.owner &&
                (this.grid[s[0]][s[1]] = this.unitTurn),
              !0)
            );
          }
          validMove(t) {
            let e = t[0],
              i = t[1];
            return (
              !(e > 9 || e < 0 || i > 9 || i < 0) &&
              1 === this.grid[e][i] &&
              0 === this.grid[e][i]
            );
          }
          won() {
            return 0 === this.enemies.length;
          }
          lost() {
            return 0 === this.units.length;
          }
          setTurnOrder() {
            let t = [],
              e = 0,
              i = 0;
            for (let n = 0; n < this.units.length + this.enemies.length; n++)
              n % 2 == 0
                ? (t.push(this.units[e]), e++)
                : (t.push(this.enemies[i]), i++);
            return console.log(t), t;
          }
          shuffleArray(t) {
            let e = t.length,
              i = e;
            for (; e >= 0; ) {
              i = Math.floor(Math.random() * (e + 1));
              let n = t[e];
              (t[e] = t[i]), (t[i] = n), e--;
            }
            return t;
          }
          renderStatus() {}
        };
      },
      642: function (t, e, i) {
        const n = i(386),
          s = (i(602), i(285)),
          r = i(424),
          l = i(833),
          o = i(782);
        i(721),
          (t.exports = class {
            constructor(t) {
              if ((this.board, 1 === t)) {
                let t = new s("user"),
                  e = [
                    new r("Bob", t),
                    new r("Joe", t),
                    new l("Billy", t),
                    new o("Joel", t),
                  ],
                  i = [
                    new r("Enemy 1"),
                    new r("Enemy 2"),
                    new l("Enemy 3"),
                    new o("Enemy 4"),
                  ];
                (this.board = new n(BATTLEFIELDS.levelOne, e, i, t)),
                  this.runGame(this.board);
              }
            }
            runGame(t) {
              t.battlefield,
                (function e() {
                  window.requestAnimationFrame(e), t.render();
                })();
            }
          });
      },
      602: function (t) {
        t.exports = BATTLEFIELDS = {
          levelOne: [
            [0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
            [0, 3, 3, 3, 0, 0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 3, 3, 3, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 3, 3, 3, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
          ],
          levelTwo: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          ],
        };
      },
      285: function (t) {
        t.exports = class {
          constructor(t) {
            (this.type = t), (this.playerUnits = []);
          }
          assignUnits(t) {
            this.playerUnits.concat(t);
          }
        };
      },
      424: function (t, e, i) {
        const n = i(721);
        t.exports = class extends n {
          constructor(t) {
            let e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            super("rifleman", 10, 5, 1, 3, 3),
              (this.name = t),
              (this.owner = e);
          }
        };
      },
      833: function (t, e, i) {
        const n = i(721);
        t.exports = class extends n {
          constructor(t) {
            let e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            super("sniper", 10, 5, 0, 5, 3), (this.name = t), (this.owner = e);
          }
        };
      },
      721: function (t) {
        t.exports = class {
          constructor(t, e, i, n, s, r) {
            (this.type = t),
              (this.health = e),
              (this.attack = i),
              (this.defense = n),
              (this.range = s),
              (this.move = r),
              (this.alive = !0),
              (this.items = []),
              (this.pos = []);
          }
          setAlive(t) {
            this.alive = t;
          }
          setPiece(t) {
            this.pos = t;
          }
          move(t) {
            this.pos = t;
          }
          giveItem(t) {
            this.items.push(t);
          }
          isAlive() {
            return this.alive;
          }
          takeDamage(t) {
            console.log("damage"),
              (this.health = this.health - (t - this.defense)),
              this.health < 0 && (this.health = 0),
              0 === this.health && (this.alive = !1);
          }
        };
      },
    },
    e = {};
  function i(n) {
    var s = e[n];
    if (void 0 !== s) return s.exports;
    var r = (e[n] = { exports: {} });
    return t[n](r, r.exports, i), r.exports;
  }
  !(function () {
    const t = i(642);
    i(386),
      i(721),
      i(285),
      i(602),
      document.addEventListener("DOMContentLoaded", (e) => {
        let i = new t(1);
        document.getElementById("end").addEventListener("click", () => {
          i.board.savePositions(),
            i.board.nextTurn(),
            i.board.setCurrentMoveCount();
          let t = document.getElementById("move");
          (document.getElementById("attackText").style.display = "none"),
            (t.style.display = "block");
          let e = document.getElementsByClassName("moveB");
          for (let t = 0; t < e.length; t++) e[t].style.display = "block";
        }),
          document.getElementById("move").addEventListener("click", () => {
            let t = document.getElementsByClassName("moveB");
            for (let e = 0; e < t.length; e++) t[e].style.display = "none";
            let e = document.getElementById("moveCounter");
            (e.style.display = "block"),
              (e.textContent = `Moves Left: ${i.board.currentMoveCount}`),
              document.addEventListener("keydown", i.board.moveunit);
          });
        let n = document.getElementsByClassName("square");
        for (let t = 0; t < n.length; t++)
          n[t].addEventListener("mouseover", (t) => {
            console.log(t.target.id);
          });
        let s = document.getElementsByClassName("unit");
        for (let t = 0; t < s.length; t++)
          s[t].addEventListener("mouseover", (t) => {
            let e = i.board.findClickedUnit(t.target.id);
            document.getElementById(
              "unitInfo"
            ).innerHTML = `HP: ${e[0]}\n\n                              <br>\n                              ATK: ${e[1]}\n\n                              <br>\n                              DEF: ${e[2]}\n\n                              <br>\n                              <br>\n                              Name: ${e[3]}\n\n                              <br>\n                              Type: ${e[4]}\n\n                              <br>\n                              Alliance: ${e[5]}`;
          });
        document.getElementById("attack").addEventListener("click", () => {
          let t = document.getElementsByClassName("moveB");
          for (let e = 0; e < t.length; e++) t[e].style.display = "none";
          document.getElementById("attackText").style.display = "block";
          let e = document.getElementsByClassName("unit");
          for (let n = 0; n < e.length; n++)
            e[n].addEventListener("click", (e) => {
              if (
                i.board.enemyNames.includes(e.target.id) &&
                null !== i.board.unitTurn.owner
              ) {
                i.board.attack(e.target.id),
                  i.board.savePositions(),
                  i.board.nextTurn(),
                  i.board.setCurrentMoveCount(),
                  (document.getElementById("move").style.display = "block"),
                  (document.getElementById("attackText").style.display =
                    "none");
                for (let e = 0; e < t.length; e++) t[e].style.display = "block";
              }
            });
        });
      });
  })();
})();
//# sourceMappingURL=main.js.map
