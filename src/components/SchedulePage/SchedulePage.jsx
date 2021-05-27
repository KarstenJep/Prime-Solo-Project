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

    return (
        <>
        <h1>Schedule</h1>
        {batches.map((batch, i) => {
            console.log('in schedule map', batch);
            return (
                <div key={i}>
                    <p>{batch.name} - {batch.batch_num}</p>
                </div>
            )
        })}
        </>
    )       
}

export default Schedule;