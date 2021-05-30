import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

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
    const [hopName, setHopName] = useState('');
    const [amount, setAmount] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const handleEdit = () => {
        // Turn on edit mode
        setEditMode(true)

        // Set values in state from update reducer
        setName(update.name)
        setStyle(update.style)
        setTank(update.tank)
        setBatch(update.batch_num)
        setHopName(update.hops.hop_name)
        setAmount(update.hops.amount)
        setUnit(update.hops.unit)
        setDate(update.hops.date)
    }

    const deleteHops = (id) => {
        console.log('in delete hops', id);
        dispatch({ type: 'DELETE_BATCH', payload: id });
    }

    const deleteBatch = (id) => {
        console.log('in delete batch', id);
        dispatch({ type: 'DELETE_BATCH', payload: id });
        history.push('/schedule');
    }

    const handleSaveEdit = (event) => {
        console.log('clicked Save Edit', update.name, update.tank, update.batch_num, update.hops);
        const updatedBatch = {

        }
        console.log('updated batch info', updatedBatch);
        dispatch({type: 'UPDATE_BATCH', payload: updatedBatch})

        setEditMode(false)

        history.push('/schedule')
    }

    

    return (
        <>
        <h2>Update {update.name} #{update.batch_num}</h2>
        <h3>Batch:</h3>
        {/* <button onClick={() => {history.push('/schedule')}}>Back</button> */}
        { editMode === false &&
            <button onClick={handleEdit}>Edit</button>
            }
        { update && editMode ?
        <form onSubmit={handleSaveEdit}>
            <input 
                value={update.name}
                type="text"
                placeholder="Beer Name"
                onChange={(e) => setName(e.target.value)}
            />
            <input
                value={update.style}
                type="text"
                placeholder="Style"
                onChange={(e) => setStyle(e.target.value)}
            />
            <input
                value={update.tank}
                type="number"
                placeholder="Tank #"
                onChange={(e) => setTank(e.target.value)}
            />
            <input
                value={update.batch_num}
                type="number"
                placeholder="Batch #"
                onChange={(e) => setBatch(e.target.value)}
            />
            
            {update.hops.map(addition => {
                return (
                    <>
                    <h5 key={addition.hop_id}>Hop Addition {addition.hop_id}:</h5>
                    <input
                        value={addition.hop_name}
                        placeholder="Hop Name"
                        onChange={(e) => setHopName(e.target.value)}
                        />
                    <input
                        value={addition.amount}
                        type="number"
                        placeholder="Amount"
                        onChange={(e) => setAmount(e.target.value)}
                        />
                    <input
                        value={addition.unit}
                        placeholder="Unit"
                        onChange={(e) => setUnit(e.target.value)}
                        />
                    <input
                        value={moment(addition.date).format('LL')}
                        type=""
                        onChange={(e) => setDate(e.target.value)}
                        />
                    <button onClick={() => deleteHops(addition.hop_id)}>Delete Addition</button>
                    </>
                )
            })}
            <button type="submit" >Save Edit</button>
         </form>
        :
            <div>
                <h4>{update.name} {update.style}:</h4>
                <p><b><i> Batch: </i></b>{update.batch_num} /<b><i> Tank: </i></b>{update.tank} </p> 
                {update.hops.map(addition => {
                    return (
                <p><b><i> Hop:</i></b> {addition.hop_name}&nbsp;
                / <b><i> Amount:</i></b> {addition.amount} {addition.unit} &nbsp;
                {/* <button onClick={completed}>✅</button></p> */}</p>
                    )
                })}
                
            </div>
        } 
        {/* End of conditional rendering */}
        <button onClick={() => deleteBatch(update.id)}>Delete Batch</button>
       
          
           
             
               


    </>
    )
}

export default UpdatePage;