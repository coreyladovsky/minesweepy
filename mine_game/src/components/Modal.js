import React from 'react'
import '../css/Modal.css'


const Modal = ({showSelf, setNewGame}) => {
    return(
        <div className={showSelf ? "showModal" : "hideModal"}>
            Game Over! 
            <button onClick={setNewGame}>Play Again?</button>
        </div>
    )
}

export default Modal;