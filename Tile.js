class Tile {
    constructor(value) {
        this.value = value;
        this.isRevealed =  false; 
        this.isFlagged = false;
    }

    revealTile() {
        this.isRevealed = true; 
    }

    toggleFlag() {
        this.isFlagged = !this.isFlagged;
    }
}

module.exports = Tile;