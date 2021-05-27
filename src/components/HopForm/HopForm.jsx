import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

function HopForm() {
    const [hopName, setHopName] = useState('');
    const [amount, setAmount] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');
    const dispatch = useDispatch();

   

    const addHops = (e) => {
        // const isoDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
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
                        type="date"
                        onChange={(e) => setDate(e.target.value)}
                        />
                    <button type="submit">Add Hop Addition</button>
               </form>
    )
}

export default HopForm;