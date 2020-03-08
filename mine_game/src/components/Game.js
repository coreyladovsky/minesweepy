import React, { useState } from 'react';
import GamePlay from '../util/Game';
import Clock from './Clock';
import Board from './Board';
const Game = () => {
    const [ difficulty, setDifficulty ] = useState("easy")
    const [countDown, setCountDown] = useState(false);
    const [game, setGame] = useState(new GamePlay(difficulty))
    const handleChange = e => {
        setDifficulty(e.target.value)
        setGame(e.target.value)
    };
    
    return(
        <div>
            <select value={difficulty} onChange={handleChange} >
                <option value={"easy"}>Easy</option>
                <option value={"medium"}>Medium</option>
                <option value={"hard"}>Hard</option>
            </select>
        
            <Clock countDown={countDown}/>

            <Board board={game.board}/>
        </div>
    )
}

export default Game;