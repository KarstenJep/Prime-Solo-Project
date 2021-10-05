import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import UpdateHops from '../UpdateHops/UpdateHops';
import moment from 'moment';
// Material UI imports 
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';
// M-UI Snackbar alert
// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });


function UpdatePage () {
    const dispatch = useDispatch();
    const history = useHistory();
    const update = useSelector((store) => store.update);
    const {id} = useParams();
    // console.log('in update', update);

    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState('');
    const [style, setStyle] = useState('');
    const [tank, setTank] = useState('');
    const [batch, setBatch] = useState('');
     // Setting state for edit snackbar alert
    const [editAlert, setEditAlert] = React.useState(false);
    // Setting state for delete snackbar alert
    // const [deleteAlert, setDeleteAlert] = React.useState(false);

    // useEffect(() => {
    //     // on page load, get list of batches from the database
    //     console.log('In useEffect param', id);
    //     dispatch({ type: 'FETCH_UPDATE', payload: id });
    //   }, []) // daily

    const handleEdit = () => {
        // Turn on edit mode
        setEditMode(true)

        // Set values in state from update reducer
        setName(update.name)
        setStyle(update.style)
        setTank(update.tank)
        setBatch(update.batch_num) 
    }

    const deleteBatch = (id) => {
        // console.log('in delete batch', id);
        dispatch({ type: 'DELETE_BATCH', payload: id });
        history.push(`/schedule`);
    }

    const handleSaveEdit = (event) => {
        // console.log('clicked Save Edit', update.name, update.tank, update.batch_num, update.hops);
        const updatedBatch = {
            id: update.id, // User can't edit, so getting from reducer
            name: name,
            style: style,
            tank: tank,
            batch_num: batch,
        }
        // console.log('updated batch info', updatedBatch);
        dispatch({type: 'UPDATE_BATCH', payload: updatedBatch})
        setEditMode(false)
        history.push(`/schedule`)
         // Activate snackbar alert
        //  setEditAlert(true);
    }

    // // Close snackbar alert
    // const handleClose = (event, reason) => {
    //     if (reason === 'clickaway') {
    //     return;
    //     }
    //     setEditAlert(false);
    // };

    return (
        <>
        { update && editMode ?
        <form className="formPanel" onSubmit={handleSaveEdit}>
            <Button 
                color="primary"
                startIcon={<SaveIcon />}
                variant="contained" 
                type="submit" >
                Save
            </Button>
            <h3>Batch</h3>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                    value={name}
                    variant="outlined"
                    type="text"
                    label="Beer Name"
                    onChange={(e) => setName(e.target.value)}
                    size="small"
                />
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    value={style}
                    variant="outlined"
                    type="text"
                    label="Style"
                    onChange={(e) => setStyle(e.target.value)}
                    size="small"
                />
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    value={tank}
                    variant="outlined"
                    type="number"
                    label="Tank #"
                    onChange={(e) => setTank(e.target.value)}
                    size="small"
                />
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    value={batch}
                    type="number"
                    variant="outlined"
                    label="Batch #"
                    onChange={(e) => setBatch(e.target.value)}
                    size="small"
                />
            </Grid>
            </Grid>
            <UpdateHops />
         </form>
        :
        <>
            <div className="formPanel">
                <ButtonGroup variant="contained" aria-label="contained primary button group" style={{ marginTop: "2vh" }}>
                    <Button 
                        startIcon={<EditIcon />}
                        color="primary"
                        onClick={handleEdit}>
                        Edit
                    </Button>
                    <Button 
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        onClick={() => deleteBatch(update.id)}>
                        Delete
                    </Button>
                </ButtonGroup>
                <h2>{update.name} {update.style}</h2>
                <p><i> Batch: </i><b>{update.batch_num}</b> /<i> Tank: </i><b>{update.tank}</b> </p> 
                {update.hops.map(addition => {
                    // console.log('in addition map', addition);
                    return (
                <p><i> Hop: </i><b>{addition.hop_name}</b>&nbsp;
                / <i> Amount:</i> <b>{addition.amount} {addition.unit}</b> / <i>Date: </i><b>{moment(addition.date).format('MM/DD')}</b></p>
                    )
                })}
                <Button 
                    style={{ margin: "2vh", marginTop: "8vh" }}
                    color="primary"
                    variant="contained"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => history.push(`/schedule`)}
                    >
                    Batches
                </Button>
            </div>
        </>  
        } 
        {/* End of conditional rendering */}
        {/* Snackbar Alert */}
        {/* <Snackbar open={editAlert} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ maxWidth: '100%' }}>
                Your Edit Was Saved!
                </Alert>
            </Snackbar> */}
    </>
    )
}

export default UpdatePage;

 // const deleteHops = (hop_id, id) => {
    //     console.log('in delete hops', hop_id, id);
    //     dispatch({ type: 'DELETE_HOPS', payload: hop_id});
    // }

{/* <IconButton 
                    aria-label="delete" 
                    variant="contained"
                    onClick={() => deleteHops(addition.hop_id, addition.batch_id)}
                    >
                    <DeleteIcon />
                </IconButton> */}