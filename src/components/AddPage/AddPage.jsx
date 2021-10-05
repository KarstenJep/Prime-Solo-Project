import React, { useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import HopForm from '../HopForm/HopForm';
// Material UI imports for inputs and buttons
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SaveIcon from '@material-ui/icons/Save';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';
// M-UI Snackbar alert
// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

function AddPage() {
  
  const dispatch = useDispatch();
  const hops = useSelector((store) => store.hops);
  const user = useSelector((store) => store.user);
  // Using state to capture inputs
  const [name, setName] = useState('');
  const [style, setStyle] = useState('');
  const [tank, setTank] = useState('');
  const [batch, setBatch] = useState('');
  // Using state to validate inputs
  const [nameError, setNameError] = useState(false);
  const [styleError, setStyleError] = useState(false);
  const [tankError, setTankError] = useState(false);
  const [batchError, setBatchError] = useState(false);
  // Setting state for snackbar alert
  const [open, setOpen] = React.useState(false);

  
  // Capturing batch inputs in state, collecting it in an object to send to DB
  const beer = {
                name: name,
                style: style,
                tank: tank,
                batch: batch,
                user_id: user.id
              }

  // Validating inputs using state
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
  // Handler to submit batch info and hop addition info and send to DB in two seperate objects
  const submitForm = () => {
      // console.log('in submitform', {beer, hops});
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
    // Activate snackbar alert
    setOpen(true);
  }
  // Auto fill form for presentation, quick testing
  const fillForm = () => {
    setName('Cabin Daze')
    setStyle('IPA')
    setTank('9')
    setBatch('345')
  }

  // Close snackbar alert
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  

  return (
    <>
      <div >
        <form className="formPanel" autoComplete="off" onSubmit={validateForm}>
          <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography onClick={fillForm} variant="h4"><b>Add Batch</b></Typography>
              </Grid>
              <Grid item xs={6}>
                  <TextField
                      // Name
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
                      // Style
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
                      // Batch Number
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
                      // Tank Number
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
          </div>
      <HopForm />

      {/* Render added hop additions */}
      <div className="formPanel" >
        {hops.map((addition, i) => {
        // console.log('in hop map', addition);
        return (
            <Typography  variant="h6">
              {moment(addition.date).format('MM/DD/YYYY')} - {addition.hop_name} - {addition.amount}{addition.unit}
            </Typography>
        )
      })}
    
    {/* Save batch and hop additions */}
      <Box >
      <Button 
        type="submit" 
        variant="contained" 
        color="primary"
        size="large" 
        onClick={submitForm}
        startIcon={<SaveIcon />}
        >
          Save All
        </Button>
      </Box>
      </div>

      {/* Snackbar Alert */}
      {/* <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ maxWidth: '100%' }}>
          New Batch has been added!
        </Alert>
      </Snackbar> */}
    </>
  );
}

export default AddPage;
