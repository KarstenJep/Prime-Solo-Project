import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

function Schedule() {
    const dispatch = useDispatch();
    const history = useHistory();
    const batches = useSelector((store) => store.batch);

    useEffect(() => {
        // on page load, get list of batches from the database
        dispatch({ type: 'FETCH_BATCHES' });
      }, [])

      const handleClick = (batch) => {
          console.log('clicked a batch', batch);
          dispatch({ type: 'SET_UPDATE', payload: batch });
          history.push('/update');  
      }

    return (
        <>
        <h1>Schedule</h1>
        
        {batches.map((batch, i) => {
            console.log('in schedule map', batch);
            return (
                <ul key={i}>
                    <li onClick={(e) => handleClick(batch)}>
                        {batch.batch_num} - {batch.name} {batch.style} - Tank {batch.tank}
                        </li>
                        {/* <p>Hop Additions: {batch.hops.map(dates => {
                            console.log('in date map', dates);
                            return (
                                <p>{dates.date}</p>
                            )
                        })}</p> */}
                </ul>
            )
        })}
        </>
    )       
}

export default Schedule;