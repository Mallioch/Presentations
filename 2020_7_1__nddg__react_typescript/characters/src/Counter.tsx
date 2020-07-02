import React, { useState, useEffect } from 'react';

function Counter() {

    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1);
    }

    useEffect(() => {
        document.title = `You clicked ${count} times.`;
    });


    return (
        <p onClick={handleClick}>Counter: {count}</p>
    );
}

export default Counter;