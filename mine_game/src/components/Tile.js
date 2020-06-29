import React, { useState, useEffect } from 'react';
import '../css/Tile.css';
const Tile = ({pos, showTile, tile}) => {
    const [isRevealed, setIsRevealed] = useState(tile.isRevealed);
    const [isFlagged, setIsFlagged] = useState(tile.isRevealed);

    useEffect(() => {
        setIsRevealed(tile.isRevealed)
    }, [tile.isRevealed])
    const revealTile = () => {
        tile.revealTile();
        setIsRevealed(true); 
    }
    const toggleFlag = (e) =>  {
        e.preventDefault();
        tile.toggleFlag()
        setIsFlagged(prevFlag => !prevFlag)
    }

    const showSelf = () => {
        showTile(pos)
    }
 
    if(isRevealed) {
        return <div className={"tile revealed " + tile.value}>{tile.value ? tile.value : null }</div>
    }
    if(isFlagged) {
        return <div className={"tile"} onContextMenu={toggleFlag}>🚩</div>
    }
    return <div className={"tile"} onContextMenu={toggleFlag} onClick={showSelf}></div>

}

export default Tile;