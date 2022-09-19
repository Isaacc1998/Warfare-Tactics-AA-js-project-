const Unit = require('./unit');

class AtGunner extends Unit {
    constructor (name, owner = null) {
        super("atGunner", 11, 8, 1, 3, 2);
        this.name = name;
        this.owner = owner;

    }
}

module.exports = AtGunner;
