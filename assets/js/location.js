class Location {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    updateCoordinates(x, y) {
        this.x += x;
        this.y += y;
    }
}

export { Location };
