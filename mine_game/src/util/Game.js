const DIFFICULTY = {
    easy: {height: 8, width: 10, bombCount: 10},
    medium: {height: 14, width: 18, bombCount: 40},
    hard: {height: 20, width: 24, bombCount: 100},
}

import { Board } from './Board';

export class Game {
    constructor(level) {
        this.isAlive = true; 
        this.difficulty = DIFFICULTY[level];
        this.board = new Board(this.difficulty)
    }

    makeMove(pos) {
        if(!this.isAlive) return;
        this.board.showTile(pos);
        if(this.board.get(pos).tileValue() === "b") {
            this.isAlive = false; 
        }
    }

    toggleFlag(pos) {
         if(!this.isAlive) return;
         this.board.toggleFlag(pos);
    }

    isWon() {
        return this.isAlive && this.board.isGameOver();
    }
}