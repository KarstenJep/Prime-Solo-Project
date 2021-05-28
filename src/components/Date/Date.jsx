import React, { useState, useEffect } from 'react';

function DateTime() {
    const [date, setDate] = useState(new Date());
    console.log('in date', date);

    // useEffect(() => {
    //     let timer = setInterval(() => setDate(new Date()), 100000)
      
    //     return function cleanup() {
    //         clearInterval(timer)
    //     }
    // });


    {/* <p>{date.toLocaleDateString()}</p> */}

    return (
        <div>
            <p>{date.toLocaleDateString()}</p>
            <p>{date.getMonth()}/{date.getDate()}</p>
        </div>
    )
}

export default DateTime;