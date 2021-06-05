import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from "react-router";
import moment, { updateLocale } from 'moment';
import HopForm from '../HopForm/HopForm';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import Image from './public/hops';
import theme from '../theme'
import './AddPage.css';
import Box from '@material-ui/core/Box';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(.5),
      // padding: theme.spacing(.5),
      flexGrow: 1,
    },
  },
  button: {
    itemAlign: 'center',
    color: theme.palette.background.primary,
  },
    paper: {
      padding: theme.spacing(.5),
      textAlign: 'center',
      color: theme.palette.text.primary,
    },
}));



function AddPage() {
  const [name, setName] = useState('');
  const [style, setStyle] = useState('');
  const [tank, setTank] = useState('');
  const [batch, setBatch] = useState('');
  const [nameError, setNameError] = useState(false);
  const [styleError, setStyleError] = useState(false);
  const [tankError, setTankError] = useState(false);
  const [batchError, setBatchError] = useState(false);
  const hops = useSelector((store) => store.hops);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const beer = {
                name: name,
                style: style,
                tank: tank,
                batch: batch,
                user_id: user.id
              }

  // useEffect(() => {
  //               dispatch({ type: 'SET_HOPS' });
  //           }, []);

  // console.log('in AP', user.id);

  // let theme = createMuiTheme();

  const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(.5),
            // padding: theme.spacing(.5),
            flexGrow: 1,
            
          },
        },
        // button: {
        //   itemAlign: 'center',
        //   color: theme.palette.text.primary,
        // },
          paper: {
            padding: theme.spacing(.5),
            textAlign: 'center',
            color: theme.palette.text.primary,
          },
          
          
      }));
  
  const classes = useStyles();

  const validateForm = (e) => {
    e.preventDefault();
    setNameError(false)
    setStyleError(false)
    setBatchError(false)
    setTankError(false)

    if (name == ''){
        setHopNameError(true)
    }
    if (style == ''){
        setAmountError(true)
    }
    if (batch == ''){
        setDateError(true)
    }
    if (tank == ''){
        setUnitError(true)
    }
    if (name && style && batch && tank) {
        submitForm(e);
    }
}

  const submitForm = () => {
      console.log('in submitform', {beer, hops});
      dispatch({type: 'ADD_BATCH', payload: {
        beer,
        hops
      },
    })
    // Clear Form
    setName('')
    setStyle('')
    setTank('')
    setBatch('')
  }

  return (
    <>
    <div>
      <ThemeProvider theme={theme} className={classes.paper}>
        <Typography className={classes.paper} variant="h4"><b>Add a Batch</b></Typography>
      </ThemeProvider>
      <form className={classes.root} autoComplete="off" onSubmit={validateForm}>
          <Grid container spacing={.25}>
              <Grid item xs={6}>
                  <TextField 
                      className="input"
                      className={classes.paper}
                      label="Name"
                      variant="outlined"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      error={nameError}
                      size="small"
                    />
              </Grid>
              <Grid item xs={6}>
                  <TextField 
                      className={classes.paper}
                      label="Style"
                      variant="outlined"
                      value={style}
                      onChange={(e) => setStyle(e.target.value)}
                      error={styleError}
                      size="small"
                    />
              </Grid>
              <Grid item xs={6}>
                  <TextField 
                      className={classes.paper}
                      label="Batch #"
                      type="number"
                      variant="outlined"
                      value={batch}
                      onChange={(e) => setBatch(e.target.value)}
                      error={batchError}
                      size="small"
                    />
              </Grid>
              <Grid item xs={6}>
                  <TextField 
                      className={classes.paper}
                      label="Tank"
                      variant="outlined"
                      value={tank}
                      onChange={(e) => setTank(e.target.value)}
                      error={tankError}
                      size="small"
                    />
                </Grid>
                </Grid>
            </form>
       
      <HopForm />
      {hops.map((addition, i) => {
      console.log('in hop map', addition);
      return (
        <ThemeProvider theme={theme} className={classes.paper}>
          <Typography className={classes.paper} variant="h6">
            {moment(addition.date).format('MM/DD/YYYY')} - {addition.hop_name} - {addition.amount}{addition.unit}
          </Typography>
        </ThemeProvider>
      )
    })}
    <Box ml={14}>
      <Button 
        type="submit" 
        variant="contained" 
        color="primary"
        size="large" 
        className={classes.button} 
        padding="5"
        onClick={submitForm}
        startIcon={<SaveIcon />}
        >
          Save All
        </Button>
      </Box>
      
      </div>
    </>
  );
}

export default AddPage;
