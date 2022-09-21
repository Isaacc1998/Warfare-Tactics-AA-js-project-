class Tile {
    constructor(type) {
        this.occupied = false;
        this.occupant = null;
        this.item = null;
    }

    occupy(unit) {
        this.occupied = true;
        this.occupant = unit;
    }

    placeItem(item) {
        this.item = item;
    }
}