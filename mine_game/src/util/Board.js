import { Tile } from './Tile';
export class Board {
    constructor({height, width, bombCount}) {
        this.height = height;
        this.width = width;
        this.bombCount = bombCount; 
        this.grid = this.constructGrid();
    }

    constructGrid(grid) {
        let output = grid || new Array(this.height).fill(null).map(el => new Array(this.width).fill(null))
        
        output = this.fillWithBombs(output);
        output = this.calculateValues(output);
        return output.map(row => {
            return row.map(el => {
                return new Tile(el)
            })
        })
    }

    fillWithBombs(grid) {
        let i = 0;
        while(i < this.bombCount) {
            const col = Math.floor(Math.random() *  this.width)
            const row = Math.floor(Math.random() *  this.height)
            if(grid[row][col] === null) {
                grid[row][col] = "b"
                i++
            }
        }
        return grid;
    }

    calculateValues(grid) {
        return grid.map((row, i) => {
            return row.map((el, j) => {
                if(el === "b") return el;
                return this.calculateValueForOneTile(grid, [i, j])
            })
        })
    }
    
    calculateValueForOneTile(grid, pos) {
        const moves = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
        let [row, col] = pos; 
        let count = 0; 
        moves.forEach(move => {
            let [addRow, addCol] = move;
            let newRow = row + addRow;
            let newCol = col + addCol 
            if(grid[newRow] && grid[newRow][newCol] === "b") {
                count++;
            }
        })
        return count; 
    }
    
    showTile(pos) {
        const [row, col] = pos; 
        const neighbors = [ [-1, 0], [0, -1], [0, 1], [1, 0]];
        if(this.grid[row] === undefined || this.grid[row][col] === undefined) return;
        let tile = this.grid[row][col];
        if(tile.isRevealed) return; 
        tile.revealTile();
        if(tile.titleValue() === 0) {
            neighbors.forEach(neighbor => {
                let [addRow, addCol] = neighbor;
                let newRow = row + addRow;
                let newCol = col + addCol 
                if(this.grid[newRow] && this.grid[newRow][newCol]) {
                    if(!this.grid[newRow][newCol].isRevealed) {
                        this.showTile([newRow, newCol])
                    }
                }
            })
        }
    }

    getTile(pos) {
        const [row, col] = pos; 
        return this.grid[row][col];
    }

    toggleFlag(pos) {
        this.grid[row][col].toggleFlag();
    }

    isGameOver() {
        let notRevealed = 0; 
        this.grid.forEach(row => {
            row.forEach(tile => {
                if(tile.isRevealed === false) {
                    notRevealed++
                }
            })
        })
        return notRevealed === this.bombCount;
    }
    
}

