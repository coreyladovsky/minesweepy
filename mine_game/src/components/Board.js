import React, {useState, useEffect} from 'react';
import Tile from './Tile';
import "../css/Board.css";
const DIFFICULTY = {
    easy: {height: 8, width: 10, bombCount: 10},
    medium: {height: 14, width: 18, bombCount: 40},
    hard: {height: 20, width: 24, bombCount: 100},
}

const Board = ({ difficulty }) => {
    // const [height, setHeight] = useState(null)
    // const [width, setWidth] = useState(null)
    // const [bombCount, setBombCount] = useState(null)
    const { height, width, bombCount} = DIFFICULTY[difficulty];

   
    const constructGrid = () => {
        let output =  new Array(height).fill(null).map(el => new Array(width).fill(null))    
        output = fillWithBombs(output);
        output = calculateValues(output);
        return output;
    }

    const fillWithBombs = (grid) => {
        let i = 0;
        while(i < bombCount) {
            const col = Math.floor(Math.random() *  width)
            const row = Math.floor(Math.random() *  height)
            if(grid[row][col] === null) {
                grid[row][col] = "b"
                i++
            }
        }
        return grid;
    }

    const calculateValues = (grid) => {
        return grid.map((row, i) => {
            return row.map((el, j) => {
                if(el === "b") return el;
                return calculateValueForOneTile(grid, [i, j])
            })
        })
    }
    
    const calculateValueForOneTile = (grid, pos) => {
        const moves = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
        const [row, col] = pos; 
        let count = 0; 
        moves.forEach(move => {
            const [addRow, addCol] = move;
            const newRow = row + addRow;
            const newCol = col + addCol; 
            if(grid[newRow] && grid[newRow][newCol] === "b") {
                count++;
            }
        })
        return count; 
    }
    
    const showTile = (pos) => {
        const [row, col] = pos; 
        const neighbors = [ [-1, 0], [0, -1], [0, 1], [1, 0]];
        if(grid[row] === undefined || grid[row][col] === undefined) return;
        const tile = grid[row][col];
        if(tile.isRevealed) return; 
        tile.revealTile();
        if(tile.titleValue() === 0) {
            neighbors.forEach(neighbor => {
                let [addRow, addCol] = neighbor;
                let newRow = row + addRow;
                let newCol = col + addCol 
                if(grid[newRow] && grid[newRow][newCol]) {
                    if(!grid[newRow][newCol].isRevealed) {
                        showTile([newRow, newCol])
                    }
                }
            })
        }
    }

    // getTile(pos) {
    //     const [row, col] = pos; 
    //     return this.grid[row][col];
    // }

    // toggleFlag(pos) {
    //     const [row, col] = pos;
    //     this.grid[row][col].toggleFlag();
    // }

    const isGameOver = () => {
        let notRevealed = 0; 
        grid.forEach(row => {
            row.forEach(tile => {
                if(tile.isRevealed === false) {
                    notRevealed++
                }
            })
        })
        return notRevealed === bombCount;
    }

    const [grid, setGrid] = useState(constructGrid())

    useEffect(() => {
       setGrid(constructGrid()) 
    }, [difficulty]) 

    const displayGrid = grid.map((row, i) => {
        return (
            <ul className={"gridRow"} key={i}>
                {row.map((tile, j) => <Tile  key={`${i}${j}`} value={tile}/>)}
                
            </ul>
        )
    })    
    return(
        <div>
            {displayGrid}
        </div>
    )
}

export default Board;