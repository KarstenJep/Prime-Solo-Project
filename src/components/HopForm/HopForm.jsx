import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// Material UI imports for inputs and buttons
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';



function HopForm() {

    const dispatch = useDispatch();
    // Using state to capture hop addition inputs
    const [hopName, setHopName] = useState('');
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [unit, setUnit] = useState('');
    // Using state to validate inputs
    const [hopNameError, setHopNameError] = useState(false);
    const [amountError, setAmountError] = useState(false);
    const [unitError, setUnitError] = useState(false);
    const [dateError, setDateError] = useState(false);


    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
            flexGrow: 1,
          },
        },
        date: {
            width:'100%',
        },
      }));
      
    const classes = useStyles();
    
    // Validating inputs by checking state
    const validateForm = (e) => {
        e.preventDefault();
        setHopNameError(false)
        setAmountError(false)
        setDateError(false)
        setUnitError(false)

        if (hopName == ''){
            setHopNameError(true)
        }
        if (amount == ''){
            setAmountError(true)
        }
        if (date == ''){
            setDateError(true)
        }
        if (unit == ''){
            setUnitError(true)
        }
        if (hopName && amount && date && unit) {
            addHops(e);
        }
    }

    // Handler so save hop addition info into an object, and send to reducer
    const addHops = (e) => {
            e.preventDefault();
            // console.log('Clicked add hops', hopName, amount, unit, date);
            dispatch({
                type: 'SET_HOPS', payload: {
                                hop_name: hopName, 
                                amount: amount, 
                                unit: unit, 
                                date: date
            }
        })
        // Clear hop form
        setHopName('')
        setAmount('')
        setUnit('')
        setDate('')
    }
    // Handler to autofill form for presentation and quick testing
    const fillForm = () => {
        setHopName('Citra')
        setAmount('6')
        setUnit('lbs')
    }

    return (
        <>
                <form className="formPanel" autoComplete="off" onSubmit={validateForm}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography onClick={fillForm} variant="h6"><b>Add Hop Addition</b></Typography>
                    </ Grid>
                    <Grid item xs={6}>
                        <TextField 
                            // Name
                            label="Hop Name"
                            variant="outlined"
                            value={hopName}
                            onChange={(e) => setHopName(e.target.value)}
                            error={hopNameError}
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            // Date 
                            className={classes.date}
                            type="date"
                            variant="outlined"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            error={dateError}
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                            // Amount
                            label="Amount"
                            type="number"
                            variant="outlined"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            error={amountError}
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField 
                            // Unit
                            select
                            label="Unit"
                            variant="outlined"
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                            error={unitError}
                            size="small"
                            style={{ marginLeft: '-1vh', width: '10vh'}}
                        >
                            <MenuItem value="oz">oz</MenuItem>
                            <MenuItem value="lbs">lbs</MenuItem>
                        </TextField>
                    </Grid>
                      <Grid item xs={3}>
                        <Button 
                            // Add hop additions
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            size="small" 
                            className={classes.root}
                            style={{ width: '12vh', height: '5.5vh', marginLeft: '-2vh'}}
                            >
                            <AddIcon fontSize="medium"/> Hop
                        </Button>
                    </Grid>
                </Grid> 
               </form>
            </>
    )
}

export default HopForm;