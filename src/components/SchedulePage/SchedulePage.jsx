import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import BatchOutlook from '../BatchOutlook/BatchOutlook';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Box from '@material-ui/core/Box';
import InventoryPage from '../InventoryPage/InventoryPage';
import AdditionsOutlook from '../AdditionsOutlook/AdditionsOutlook';


function Schedule() {
    const dispatch = useDispatch();
    const history = useHistory();
    // const batches = useSelector((store) => store.batch);
    // const inventory = useSelector((store) => store.inventory);
    const [batchView, setBatchView] = useState(true);
    const [hopView, setHopView] = useState(false);
    const [additionView, setAdditionView] = useState(false);

    const handleBatch = () => {
        setBatchView(true)
        setHopView(false)
        setAdditionView(false)
      }

      const handleHops = () => {
        setBatchView(false)
        setHopView(true)
        setAdditionView(false)
      
      }

      const handleAdditions = () => {
        setBatchView(false)
        setAdditionView(true)
        setHopView(false)
      }

    return (
        <>
        <Box ml={6}>
            <ButtonGroup variant="contained" aria-label="contained primary button group">
                <Button color="primary" onClick={handleBatch}>Batch</Button>
                <Button color="secondary" onClick={handleAdditions}>Additions</Button>
                <Button color="primary" type="dark" onClick={handleHops}>Hops</Button>
            </ButtonGroup>
        </Box>
        
        { hopView &&   
        <InventoryPage />
        }

        { batchView &&
        <BatchOutlook />
        }
        
        { additionView &&
        <AdditionsOutlook />
        }
        
      </>  
    )       
}

export default Schedule;