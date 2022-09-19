const Unit = require('./unit');
class Rifleman extends Unit {
    constructor (name, owner = null) {
        super("rifleman", 10, 5, 1, 3, 3);
        this.name = name;
        this.owner = owner;
    }
}

module.exports = Rifleman;