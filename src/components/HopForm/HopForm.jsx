import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'
import Icon from '@material-ui/core/Icon';



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

    let theme = createMuiTheme();

    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(.5),
            // padding: theme.spacing(.5),
            flexGrow: 1,
          },
        },
        date: {
            width:'90%',
            padding: theme.spacing(.5),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
          paper: {
            padding: theme.spacing(.5),
            textAlign: 'center',
            color: theme.palette.text.primary,
          },
      }));
      
    //   export default function HopForm() {
    const classes = useStyles();

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

    const addHops = (e) => {
            e.preventDefault();
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
        <>
                <form className={classes.root} autoComplete="off" onSubmit={validateForm}>
                <ThemeProvider theme={theme} className={classes.paper}>
                    <Typography className={classes.paper} variant="h6"><b>Hop Additions</b></Typography>
                </ThemeProvider>
                <Grid container spacing={.25}>
                    <Grid item xs={6}>
                        <TextField 
                            className={classes.paper}
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
                            className={classes.paper}
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
                            className={classes.paper}
                            select
                            label="Unit"
                            variant="outlined"
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                            error={unitError}
                            size="small"
                        >
                            <MenuItem value="oz">oz</MenuItem>
                            <MenuItem value="lbs">lbs</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={2}>
                    {/* <Icon 
                    style={{ fontSize: 30 }}
                    type="submit"
                    >add_circle</Icon> */}
                        <Button type="submit" 
                                variant="contained" 
                                color="primary" 
                                size="small" 
                                className={classes.root} 
                                // marginright="3">
                                >
                            ➕
                        </Button>
                    </Grid>
                </Grid> 
               </form>
               </>
    )
}

export default HopForm;