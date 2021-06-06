import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';

function InventoryPage() {
  const dispatch = useDispatch();
  const inventory = useSelector((store) => store.inventory);
  console.log('in inventory', inventory);

  useEffect(() => {
    // on page load, get list of inventory from the database
    dispatch({ type: 'FETCH_INVENTORY' });
  }, [])

  return (
    <div>
        <h2 className="formPanel5">Hop Count</h2>

       {inventory.map(hops => {
         console.log('in hops map', hops)
         return (
           <p className="formPanel6"><b>{hops.hop_name}</b> - <i>{hops.sum} {hops.unit}</i></p>
         )
       })}
   </div>
  );
}

export default InventoryPage;