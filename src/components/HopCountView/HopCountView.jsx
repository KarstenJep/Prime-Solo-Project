import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';

function HopCount() {
  const dispatch = useDispatch();
  const count = useSelector((store) => store.inventory);
  // console.log('in hopCount', count);

  // on page load, get list of inventory from the database
  useEffect(() => {
    dispatch({ type: 'FETCH_INVENTORY' });
  }, [])

  return (
    <div>
      <h2 className="formPanel5">Hop Count</h2>
      
      {count.map(hops => {
        //  console.log('in hops map', hops)
         return (
           <p className="formPanel6"><b>{hops.hop_name}</b> - <i>{hops.sum} {hops.unit}</i></p>
         )
       })}
   </div>
  );
}

export default HopCount;