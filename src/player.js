//const Levels = require('./level');
class Player {
    constructor (type) {
        this.type = type;
        this.playerUnits = [];
    }

    assignUnits(units) {
        this.playerUnits.concat(units);
    }
}

module.exports = Player;