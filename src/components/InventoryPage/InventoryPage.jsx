import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useHistory, useParams } from 'react-router-dom';


function InventoryPage() {
  const dispatch = useDispatch();
  const inventory = useSelector((store) => store.inventory);
  console.log('in inventory', inventory);
  const amount = inventory.sum;
  const history = useHistory();

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

    const handleSchedule = () => {
      // setInventoryView(false)
      history.push('/schedule')
    }

  return (
    <>
     <Box ml={14}>
           <Button variant="contained" color="primary" onClick={handleSchedule}>View Schedule</Button>
        </Box>
      <form className="formPanel3" >
      <h1>&nbsp;Inventory</h1>
      {/* {maths()} */}
       {inventory.map(hops => {
         console.log('in hops map', hops)
         return (
           <li><b>{hops.hop_name}</b>  - {hops.sum / 1} {hops.unit}</li>
         )
       })}
    </form>
   </>
  );
}

export default InventoryPage;