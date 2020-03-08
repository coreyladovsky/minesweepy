import React, { useState, useEffect } from 'react';

const Clock = () => {
    const [time, setTime] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(prevTime => prevTime + 1)
        }, 1000)
        return () => {
            clearInterval(timer);
        }
    }, [])
    return(
        <div>{time}</div>
    )
}

export default Clock;