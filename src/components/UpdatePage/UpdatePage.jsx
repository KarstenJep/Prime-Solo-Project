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
import { makeStyles } from '@material-ui/core/styles';


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
        history.push('/schedule');
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
        history.push('/schedule')
    }

    const completed = () => {}

    return (
        <>
        
        {/* <h3>Batch:</h3> */}
        {/* <button onClick={() => {history.push('/schedule')}}>Back</button> */}
        { editMode === false &&
            <>
            <Box ml={10}>
            <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                <Button onClick={handleEdit}>Edit</Button>
                <Button>&nbsp;✔️&nbsp;</Button>
                <Button 
                startIcon={<DeleteIcon />}
                onClick={() => deleteBatch(update.id)}>Batch</Button>
            </ButtonGroup>
            </Box>
            {/* <button onClick={handleEdit}>Edit</button> */}
            </>
            }
        {/* <button onClick={() => deleteBatch(update.id)}>Delete Batch</button> */}
        { update && editMode ?
        <form className="formPanel" onSubmit={handleSaveEdit}>
            <Button 
            startIcon={<SaveIcon />}
            variant="contained" type="submit" >Save</Button>
            <h5>Batch</h5>
            <input 
                value={name}
                type="text"
                placeholder="Beer Name"
                onChange={(e) => setName(e.target.value)}
            />
            <input
                value={style}
                type="text"
                placeholder="Style"
                onChange={(e) => setStyle(e.target.value)}
            />
            <input
                value={tank}
                type="number"
                placeholder="Tank #"
                onChange={(e) => setTank(e.target.value)}
            />
            <input
                value={batch}
                type="number"
                placeholder="Batch #"
                onChange={(e) => setBatch(e.target.value)}
            />
            <UpdateHops />
         </form>
        :
        
            <div className="formPanel">
                <>
                <h2>{update.name} {update.style}</h2>
                <p><b><i> Batch: </i></b>{update.batch_num} /<b><i> Tank: </i></b>{update.tank} </p> 
                {update.hops.map(addition => {
                    console.log('in addition map', addition);
                    return (
                <p><b><i> Hop:</i></b> {addition.hop_name}&nbsp;
                / <b><i> Amount:</i></b> {addition.amount} {addition.unit} 
               
                 
                    {/* <button onClick={completed}>✔️</button> */}
                 {/* <button onClick={() => deleteHops(addition.hop_id, addition.batch_id)}>Delete Addition</button></p> */}
                 <IconButton 
                    aria-label="delete" 
                    variant="contained"
                    // className={classes.margin}
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