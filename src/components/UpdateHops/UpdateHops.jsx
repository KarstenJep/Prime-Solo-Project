import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';


function UpdateHops() {
  const dispatch = useDispatch();
  const update = useSelector((store) => store.update);
  const [count, setCount] = useState(0)

  // update.hops.map(hop => {
  //   console.log('in update hops', hop);
  //   const [hopName{hop_id}, setHopName] = useState('');
  //   const [amount, setAmount] = useState('');
  //   const [unit, setUnit] = useState('');
  //   const [date, setDate] = useState('');
  // })
  const [hopName, setHopName] = useState('');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('');
  const [date, setDate] = useState('');
  console.log('in update hops', update);

  // setHopName(update.hops.hop_name)
  // setAmount(update.hops.amount)
  // setUnit(update.hops.unit)
  // setDate(update.hops.date)

  const handleChange = (e) => {
    e.preventDefault();
      dispatch({ 
        type: 'EDIT_ONCHANGE', 
        payload: { property: 'hop_name', value: e.target.value }
    });

  }

  const handleSaveHops = () => {}

  return (
    
    <form onSubmit={handleSaveHops}>
      {update.hops.map(addition => {
        
        return (
          <>
            <h5 key={addition.hop_id}>Hop Addition</h5>
            <input
                
                // value={hopName}
                placeholder="Hop Name"
                // onChange={(e) => handleChange(e)}
                value={addition.hop_name}
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
            {/* <button type="submit" >Save Edit(s)</button> */}
          </>
        )
      })}
    </form>
  );
}

export default UpdateHops;
