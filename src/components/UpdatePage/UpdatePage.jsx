import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

function UpdatePage () {
    const dispatch = useDispatch();
    const history = useHistory();
    const update = useSelector((store) => store.update);
    console.log('in update', update);

    const deleteHops = (id) => {
        console.log('in delete hops', id);
        dispatch({ type: 'DELETE_BATCH', payload: id });
    }

    const deleteBatch = (id) => {
        console.log('in delete batch', id);
        dispatch({ type: 'DELETE_BATCH', payload: id });
        history.push('/schedule');
    }

    const handleSaveEdit = () => {
        console.log('clicked Save Edit', update.name, update.tank, update.batch_num);
    }

    return (
        <>
        <h2>Update {update.name} #{update.batch_num}</h2>
        <h3>Batch:</h3>
        <form onSubmit={handleSaveEdit}>
            <input 
                value={update.name}
                type="text"
                placeholder="Beer Name"
                onChange={(e) => handleChange(e)}
            />
            <input
                value={update.style}
                type="text"
                placeholder="Style"
                onChange={(e) => handleChange(e)}
            />
            <input
                value={update.tank}
                type="number"
                placeholder="Tank #"
                onChange={(e) => handleChange(e)}
            />
            <input
                value={update.batch_num}
                type="number"
                placeholder="Batch #"
                onChange={(e) => handleChange(e)}
            />
            
            {update.hops.map(addition => {
                return (
                    <>
                    <h5 key={addition.hop_id}>Hop Addition {addition.hop_id}:</h5>
                    <input
                        value={addition.hop_name}
                        placeholder="Hop Name"
                        onChange={(e) => handleChange(e)}
                        />
                    <input
                        value={addition.amount}
                        type=""
                        placeholder="Amount"
                        onChange={(e) => handleChange(e)}
                        />
                    <input
                        value={addition.unit}
                        placeholder="Unit"
                        onChange={(e) => handleChange(e)}
                        />
                    <input
                        value={moment(addition.date).format('LL')}
                        type=""
                        onChange={(e) => handleChange(e)}
                        />
                    <button onClick={() => deleteHops(addition.hop_id)}>Delete Addition</button>
                    </>
                )
            })}
            <button type="submit" >Save Edit</button>
        </form>
        <button onClick={() => deleteBatch(update.id)}>Delete Batch</button>



    </>
    )
}

export default UpdatePage;