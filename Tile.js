class Tile {
    constructor(sym) {
        this.sym = sym;
        this.hidden =  true; 
    }

    showTile() {
        this.hidden = false; 
    }
}