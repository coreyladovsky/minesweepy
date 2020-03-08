import React, { useState, useEffect, useRef } from 'react';

const Clock = ({countDown}) => {
    const [time, setTime] = useState(0);
    let timer = useRef();
    useEffect(() => {
        if(countDown) {
            timer.current = setInterval(() => {
                setTime(prevTime => prevTime + 1)
            }, 1000)
        }
        return () => {
            clearInterval(timer.current);
        }
    }, [countDown])

    const stopTimer = () => {
        clearInterval(timer.current);
    }
    if(!countDown) stopTimer();
    return(
        <div>{time}</div>
    )
}

export default Clock;