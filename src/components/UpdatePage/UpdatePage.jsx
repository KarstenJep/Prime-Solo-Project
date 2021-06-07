import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import UpdateHops from '../UpdateHops/UpdateHops';

import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';


function UpdatePage () {
    const dispatch = useDispatch();
    const history = useHistory();
    const update = useSelector((store) => store.update);
    console.log('in update', update);

    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState('');
    const [style, setStyle] = useState('');
    const [tank, setTank] = useState('');
    const [batch, setBatch] = useState('');

    // const useStyles = makeStyles((theme) => ({
    //     margin: {
    //       margin: theme.spacing(1),
    //     },
    //     extendedIcon: {
    //       marginRight: theme.spacing(1),
    //     },
    //   }));

    // const classes = useStyles();

    const {id} = useParams();

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

    const deleteHops = (hop_id, id) => {
        console.log('in delete hops', hop_id, id);
        dispatch({ type: 'DELETE_HOPS', payload: hop_id});
    }

    const deleteBatch = (id) => {
        console.log('in delete batch', id);
        dispatch({ type: 'DELETE_BATCH', payload: id });
        history.push(`/schedule`);
    }

    const handleSaveEdit = (event) => {
        console.log('clicked Save Edit', update.name, update.tank, update.batch_num, update.hops);
        const updatedBatch = {
            id: update.id, // User can't edit, so getting from reducer
            name: name,
            style: style,
            tank: tank,
            batch_num: batch,
        }
        console.log('updated batch info', updatedBatch);
        dispatch({type: 'UPDATE_BATCH', payload: updatedBatch})

        setEditMode(false)
        history.push(`/schedule`)
    }

    const completed = () => {}

    return (
        <>
        { editMode === false &&
            <>
            <Box ml={10}>
            <ButtonGroup variant="contained" aria-label="contained primary button group">
                <Button onClick={handleEdit} color="primary">Edit</Button>
                <Button color="secondary">&nbsp;✔️&nbsp;</Button>
                <Button 
                color="primary"
                startIcon={<DeleteIcon />}
                onClick={() => deleteBatch(update.id)}>Batch</Button>
            </ButtonGroup>
            </Box>
            </>
            }
        { update && editMode ?
        <form className="formPanel" onSubmit={handleSaveEdit}>
            <Button 
            color="primary"
            startIcon={<SaveIcon />}
            variant="contained" type="submit" >Save</Button>
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
        
            <div className="formPanel">
                <>
                <h2>{update.name} {update.style}</h2>
                <p><i> Batch: </i><b>{update.batch_num}</b> /<i> Tank: </i><b>{update.tank}</b> </p> 
                {update.hops.map(addition => {
                    console.log('in addition map', addition);
                    return (
                <p><i> Hop: </i><b>{addition.hop_name}</b>&nbsp;
                / <i> Amount:</i> <b>{addition.amount} {addition.unit}</b>  
               
                 <IconButton 
                    aria-label="delete" 
                    variant="contained"
                    onClick={() => deleteHops(addition.hop_id, addition.batch_id)}
                    >
                    <DeleteIcon />
                </IconButton>
                </p>
                    )
                })}
              </>  
            </div>
        } 
        {/* End of conditional rendering */}
    </>
    )
}

export default UpdatePage;