export default class TileClas {
    constructor(value) {
        this.value = value;
        this.isRevealed =  false; 
        this.isFlagged = false;
    }

    tileValue() {
        return this.value;
    }

    revealTile() {
        this.isRevealed = true; 
    }

    toggleFlag() {
        this.isFlagged = !this.isFlagged;
    }
}

