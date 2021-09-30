import React, { useState } from 'react';
import BatchView from '../BatchView/BatchView';
import HopCountView from '../HopCountView/HopCountView';
import AdditionsView from '../AdditionsView/AdditionsView';
// Material UI Imports
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Box from '@material-ui/core/Box';


function Outlook() {

    const [batchView, setBatchView] = useState(true);
    const [hopView, setHopView] = useState(false);
    const [additionView, setAdditionView] = useState(false);

    // The 3 handlers below set state to trigger which component/view to display
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
        {/* Button group changes state to control user view */}
        <div className="btngrp">
            <ButtonGroup variant="contained" aria-label="contained primary button group" >
                <Button color="primary" onClick={handleBatch}>Batch</Button>
                <Button color="primary" onClick={handleAdditions}>Additions</Button>
                <Button color="primary" onClick={handleHops}>Hops</Button>
            </ButtonGroup>
        </div>
        
        { hopView &&   
        <HopCountView />
        }

        { batchView &&
        <BatchView />
        }
        
        { additionView &&
        <AdditionsView />
        }   
      </>  
    )       
}

export default Outlook;