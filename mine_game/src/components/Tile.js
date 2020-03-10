import React, { useState } from 'react';
import '../css/Tile.css';
const Tile = ({value}) => {
    const [isRevealed, setIsRevealed] = useState(false);
    const [isFlagged, setIsFlagged] = useState(false);
    const revealTile = () => setIsRevealed(true); 
    const toggleFlag = (e) =>  {
        e.preventDefault();
        setIsFlagged(prevFlag => !prevFlag)
    }

    // tileValue() {
    //     return this.value;
    // }
    if(isRevealed) {
        return <div className={"tile revealed " + value}>{value ? value : null }</div>
    }
    if(isFlagged) {
        return <div className={"tile"} onContextMenu={toggleFlag}>🚩</div>
    }
    return <div className={"tile"} onContextMenu={toggleFlag}></div>

}

export default Tile;