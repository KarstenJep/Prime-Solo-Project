import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';

function UpdatePage () {
    const dispatch = useDispatch();
    const update = useSelector((store) => store.update);
    console.log('in update', update);

    const handleSubmit = () => {}

    return (
        <>
        <h1>Update Batch</h1>
        <form onSubmit={handleSubmit}>
            <input 
                value={update.name}
                type="text"
                placeholder="Beer Name"
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
                onChange={(e) => setBatch(e.target.value)}
            />
            {update.hop_id.map(addition => {
                return (
                    <>
                    <input
                        value={update.hop_name}
                        placeholder="Hop Name"
                        onChange={(e) => setHopName(e.target.value)}
                        />
                    <input
                        value={update.amount}
                        type=""
                        placeholder="Amount"
                        onChange={(e) => setAmount(e.target.value)}
                        />
                    <input
                        value={update.unit}
                        placeholder="Unit"
                        onChange={(e) => setUnit(e.target.value)}
                        />
                    <input
                        value={moment(update.date).format('LL')}
                        type=""
                        onChange={(e) => setDate(e.target.value)}
                        />
                    </>
                )
            })}
                    
        </form>



    </>
    )
}

export default UpdatePage;