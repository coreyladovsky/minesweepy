import React, { useState, useEffect, useRef } from 'react';

const Clock = ({countDown, resetCount}) => {
    console.log(countDown)
    const [time, setTime] = useState(0);
    let timer = useRef();
    useEffect(() => {
        if(countDown) {
            timer.current = setInterval(() => {
                setTime(prevTime => prevTime + 1)
            }, 1000)
        } 
        if(resetCount) {
            clearInterval(timer.current)
            setTime(0)
        }
        return () => {
            clearInterval(timer.current);
        }
    }, [countDown, resetCount])

    const stopTimer = () => {
        clearInterval(timer.current);
    }
    if(!countDown) stopTimer();
    return(
        <div>{time}</div>
    )
}

export default Clock;