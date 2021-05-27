import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

function HopForm() {
    const [hopName, setHopName] = useState('');
    const [amount, setAmount] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');
    const dispatch = useDispatch();


    const addHops = (e) => {
        e.preventDefault();
        console.log('Clicked add hops', hopName, amount, unit, date );
        dispatch({
            type: 'SET_HOPS', payload: {
                               hop_name: hopName, 
                               amount: amount, 
                               unit: unit, 
                               date: date
            }
        })
    }

    return (
        <>
                <form onSubmit={addHops}>
                <h5>Hop Additions</h5>
                    <input
                        value={hopName}
                        placeholder="Hop Name"
                        onChange={(e) => setHopName(e.target.value)}
                        />
                    <input
                        value={amount}
                        placeholder="Amount"
                        onChange={(e) => setAmount(e.target.value)}
                        />
                    <input
                        value={unit}
                        placeholder="Unit"
                        onChange={(e) => setUnit(e.target.value)}
                        />
                    <input
                        value={date}
                        placeholder="Date"
                        onChange={(e) => setDate(e.target.value)}
                        />
                    <button type="submit">Add Hop Addition</button>
                </form>
        </>
    )
}

export default HopForm;