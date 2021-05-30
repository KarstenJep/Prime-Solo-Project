import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';


function InventoryPage() {
  const dispatch = useDispatch();
  const inventory = useSelector((store) => store.inventory);
  console.log('in inventory', inventory);
  const amount = inventory.sum;

  useEffect(() => {
    // on page load, get list of inventory from the database
    dispatch({ type: 'FETCH_INVENTORY' });
  }, [])

  // const maths = () => {
    
  //   inventory.map(hops => {
  //     console.log('in if', hops, hops.unit);
  //     if(hops.unit === 'oz' && hops.sum < 16) {
  //       hops.sum /= 16;
  //       console.log('in if', hops.sum);
  //       // return hops.sum
  //     }
  //   })
  //   return (
  //       hops.sum
  //   )
  //   }
  // }

  return (
    <>
    <div>
      <h2>Inventory</h2>
      {/* {maths()} */}
       {inventory.map(hops => {
         console.log('in hops map', hops)
         return (
           <li>{hops.hop_name} Upcoming Need: {hops.sum / 1}{hops.unit}</li>
         )
       })}
    </div>
   </>
  );
}

export default InventoryPage;