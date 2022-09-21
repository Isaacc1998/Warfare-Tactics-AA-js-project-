let canvas = document.getElementById('battlefield');
let context = moveOption.getContext('2d');

function isInside(pos, rect){
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
}

let move = document.getElementById("move");
let attack = document.getElementById("attack");
let items = document.getElementById("items");
let defend = document.getElementById("defend");
let pause = document.getElementById("pause");
let restart = document.getElementById("restart");
let mainMenu = document.getElementById("mainMenu");
let endTurn = document.getElementById("endTurn");


move.document.addEventListener("click", moveUnit);

function moveUnit() {

}

endTurn.document.addEventListener("click",);


