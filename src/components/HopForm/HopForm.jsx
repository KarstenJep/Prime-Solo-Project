import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

function HopForm() {
    const [hopName, setHopName] = useState('');
    const [amount, setAmount] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');
    const [hopNameError, setHopNameError] = useState(false);
    const [amountError, setAmountError] = useState(false);
    const [unitError, setUnitError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const dispatch = useDispatch();

    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(.5),
            width: '75%',
            height: '50%',
            
          },
        },
      }));
      
    //   export default function HopForm() {
        const classes = useStyles();

    const validateForm = (e) => {
        e.preventDefault();
        setHopNameError(false)
        setAmountError(false)
        setDateError(false)

        if (hopName == ''){
            setHopNameError(true)
        }
        if (amount == ''){
            setAmountError(true)
        }
        if (date == ''){
            setDateError(true)
        }
        if (hopName && amount && date) {
            addHops(e);
        }
    }

    const addHops = (e) => {
        // const isoDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
            e.preventDefault();
           
            // setHopNameError(false)
            // setAmountError(false)
            // setDateError(false)

            // if (hopName == ''){
            //     setHopNameError(true)
            // }
            // if (amount == ''){
            //     setAmountError(true)
            // }
            // if (date == ''){
            //     setDateError(true)
            // }
       
            console.log('Clicked add hops', hopName, amount, unit, date);
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

    return (
                <form autoComplete="off" minHeight onSubmit={validateForm}>
                <h5>Hop Additions</h5>
                    <TextField 
                        className={classes.root}
                        label="Hop Name"
                        variant="outlined"
                        value={hopName}
                        onChange={(e) => setHopName(e.target.value)}
                        error={hopNameError}
                    />
                    <TextField 
                        className={classes.root}
                        label="Amount"
                        type="number"
                        variant="outlined"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        error={amountError}
                    />
                    <TextField 
                        className={classes.root}
                        label="Unit"
                        type="number"
                        variant="outlined"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                    />
                    <TextField 
                        className={classes.root}
                        // label="Date"
                        type="date"
                        variant="outlined"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        error={dateError}
                    />
                    
                    {/* <input
                        value={date}
                        type="date"
                        onChange={(e) => setDate(e.target.value)}
                        /> */}
                    <button type="submit">Add Hop Addition</button>
               </form>
    )
}
// }

export default HopForm;