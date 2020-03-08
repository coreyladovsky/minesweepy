const Tile= require("./Tile");

class Board {
    constructor(height, width, bombCount) {
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
        let tile = this.grid[row][col];
        if(tile.isRevealed) return; 
        tile.revealTile();
    }

    displayBoard() {
        return this.grid.map(row => {
            return row.map(tile => {
                // if(tile.isRevealed) {
                //     return tile.value
                // }
                // return null;
                return tile.value;
            })
        })
    }

}

let board = new Board(8, 10, 10)
console.log(board.displayBoard())