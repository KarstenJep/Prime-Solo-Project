import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
  
function BatchOutlook () {

    const dispatch = useDispatch();
    const history = useHistory();
    const batches = useSelector((store) => store.batch);
    
    // on page load, get list of batches from the database, ordered by batch num
    useEffect(() => {
        dispatch({ type: 'FETCH_BATCHES' });
      }, [])

      const handleClick = (batch) => {
        //   console.log('clicked a batch', batch);
          dispatch({ type: 'SET_UPDATE', payload: batch });
          history.push(`/update/${batch.id}`);  
      }

  return (
    <div >
        <h2 className="formPanel5">Batches</h2>

        {batches.map((batch, i) => {
            // console.log('in schedule map', batch);
            return (
                <p className="formPanel3" onClick={(e) => handleClick(batch)}>
                <b>{batch.batch_num}</b> - {batch.name} <i>{batch.style}</i> - Tank {batch.tank}</p>
            )
        })}     
    </div>
  );
}

export default BatchOutlook;