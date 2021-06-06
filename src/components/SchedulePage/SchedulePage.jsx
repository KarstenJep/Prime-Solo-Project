import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import BatchOutlook from '../BatchOutlook/BatchOutlook';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Box from '@material-ui/core/Box';
import InventoryPage from '../InventoryPage/InventoryPage';


function Schedule() {
    const dispatch = useDispatch();
    const history = useHistory();
    // const batches = useSelector((store) => store.batch);
    // const inventory = useSelector((store) => store.inventory);
    const [inventoryView, setInventoryView] = useState(false);
    const [additionView, setAdditionView] = useState(false);

    // useEffect(() => {
    //     // on page load, get list of batches from the database
    //     dispatch({ type: 'FETCH_BATCHES' });
    //   }, [])

    //   const handleClick = (batch) => {
    //       console.log('clicked a batch', batch);
    //       dispatch({ type: 'SET_UPDATE', payload: batch });
    //       history.push(`/update/${batch.id}`);  
    //   }

      const handleInventory = () => {
        setInventoryView(true)
        setAdditionView(false)
      }

      const handleAdditions = () => {
        setAdditionView(true)
        setInventoryView(false)
      }

    return (
        <>
        {/* { inventoryView === false && */}
        <Box ml={6}>
            <ButtonGroup variant="contained" aria-label="contained primary button group">
                <Button color="primary" onClick={handleInventory}>Batch</Button>
                <Button color="secondary" onClick={handleInventory}>Additions</Button>
                <Button color="primary" onClick={handleAdditions}>Count</Button>
            </ButtonGroup>
        </Box>
        {/* } */}
        
        { inventoryView ?   
        <InventoryPage />
        :

        <BatchOutlook />
        // <div className="formPanel3">
        // <h1>&nbsp;Schedule</h1>
        
        
        // {batches.map((batch, i) => {
        //     console.log('in schedule map', batch);
        //     return (
        //         <span key={i}>
        //             <p onClick={(e) => handleClick(batch)}>
        //                 <b>&nbsp;{batch.batch_num}</b> - {batch.name} {batch.style} - Tank {batch.tank}
        //                 </p>
        //                 {/* <p>Hop Additions: {batch.hops.map(dates => {
        //                     console.log('in date map', dates);
        //                     return (
        //                         <p>{dates.date}</p>
        //                     )
        //                 })}</p> */}
        //                 </span>
        //     )
        // })} 
        
        // </div>
        }
      </>  
    )       
}

export default Schedule;