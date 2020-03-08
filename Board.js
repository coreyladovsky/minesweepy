class Board {
    constructor(height, width, bombCount) {
        this.height = height;
        this.width = width;
        this.bombCount = bombCount; 
        this.grid = this.constructGrid();
    }

    constructGrid(grid) {
        if(grid) return grid; 
        let output = new Array(this.height).fill(null)
        output = output.map(el => new Array(this.width).fill(null))
        let i = 0; 
        while(i < this.bombCount) {
            const col = Math.floor(Math.random() *  this.width)
            const row = Math.floor(Math.random() *  this.height)
            if(output[row][col] === null) {
                output[row][col] = "bomb"
                i++
            }
        }
        return output;
    }


}

let board = new Board(8, 10, 10)
console.log(board)