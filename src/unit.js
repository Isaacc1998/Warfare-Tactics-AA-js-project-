class Unit {
    constructor (type, health, attack, defense, range, move) {
        this.type = type;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
        this.range = range;
        this.move = move;
        this.alive = true;
        this.items = [];
        this.pos = [];
        //ammo
        //clip
    }

    setAlive(status) {
        this.alive = status;
    }

    setPiece(pos) {
        this.pos = pos;
    }

    move(newPos) {
        this.pos = newPos;
    }

    giveItem(item) {
        this.items.push(item);
    }

    isAlive() {
        this.health === 0 ? this.alive = false : this.alive = true;
        return this.alive;
    }

    takeDamage(dmg) {
        this.health = this.health - (dmg - this.defense);
        if (!this.isAlive) {
            this.alive = false;
        }
    }
}

module.exports = Unit;