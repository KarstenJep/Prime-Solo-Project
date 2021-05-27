import React, { useEffect, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import {useDispatch, useSelector} from 'react-redux';

function Schedule() {
    const dispatch = useDispatch();
    const batches = useSelector((store) => store.batch);

    useEffect(() => {
        // on page load, get list of batches from the database
        dispatch({ type: 'FETCH_BATCHES' });
      }, [])

      const handleClick = () => {
          console.log('handle clicked');
      }

    return (
        <>
        <h1>Schedule</h1>
        {batches.map((batch, i) => {
            console.log('in schedule map', batch);
            return (
                <ul key={i}>
                    <li onClick={handleClick}>{batch.batch_num} - {batch.name} - Tank {batch.tank}</li>
                </ul>
            )
        })}
        </>
    )       
}

export default Schedule;