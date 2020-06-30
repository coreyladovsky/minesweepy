import React, { useState } from 'react';
import Clock from './Clock';
import Board from './Board';
import Modal from './Modal';
const Game = () => {
    const [ difficulty, setDifficulty ] = useState("easy")
    const [countDown, setCountDown] = useState(false);
    const [resetCount, setResetCount] = useState(false);
    const [inSession, setInSession] = useState(false); 
    const [isGameOver, setIsGameOver] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [shuffleBoard, setShuffleBoard] = useState(false);
   
    const handleChange = e => {
        setDifficulty(e.target.value)
        setResetCount(true)
    };

    const endGame = () => {
        setShowModal(true)
        setIsGameOver(true);
        setCountDown(false);
        setInSession(false)
    }

    const setNewGame = () => {
        setShowModal(false);
        setIsGameOver(false);
        setShuffleBoard(!shuffleBoard)
    }

    const setStartGame = () => {
        setCountDown(true);
        setInSession(true)
        setResetCount(false)
    }

    
    return(
        <div>
            <Modal showSelf={showModal} setNewGame={setNewGame}/>
            <select value={difficulty} onChange={handleChange} >
                <option value={"easy"}>Easy</option>
                <option value={"medium"}>Medium</option>
                <option value={"hard"}>Hard</option>
            </select>
        
            <Clock countDown={countDown} resetCount={resetCount}/>

            <Board difficulty={difficulty} 
            endGame={endGame} 
            setStartGame={setStartGame}
            inSession={inSession}
            shuffleBoard={shuffleBoard}
            setShuffleBoard={setShuffleBoard}
            />
        </div>
    )
}

export default Game;