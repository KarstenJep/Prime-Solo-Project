import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from "react-router";
import HopForm from '../HopForm/HopForm';



function AddPage() {
  const [name, setName] = useState('');
  const [tank, setTank] = useState('');
  const [batch, setBatch] = useState('');
  const hops = useSelector((store) => store.hops);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const beer = {
                name: name,
                tank: tank,
                batch: batch,
                user_id: user.id
              }

  console.log('in AP', user.id);
  
  const submitForm = (e) => {
    console.log('in submitform', {beer, hops});
      e.preventDefault()
      dispatch({type: 'ADD_BATCH', payload: {
        beer,
        hops
      }
    })
  }



  return (
    <div className="addform">
      <h3>Add a batch biatch!</h3>
      <form onSubmit={submitForm}>
        <input 
          value={name}
          placeholder="Beer Name"
          onChange={(e) => setName(e.target.value)}
          />
        <input
          value={tank}
          placeholder="Tank #"
          onChange={(e) => setTank(e.target.value)}
          />
        <input
          value={batch}
          placeholder="Batch #"
          onChange={(e) => setBatch(e.target.value)}
          />
        
       
      </form>
      <HopForm />
      {hops.map((addition, i) => {
      console.log('in hop map', addition);
      return (
        <div key={i}>
          <li>Addition: {i + 1} / {addition.hop_name} / {addition.amount}{addition.unit} / {addition.date}</li>
        </div>
      )
    })}
     <button type="submit" onClick={submitForm} >Save Batch</button>
    </div>
  );
}

export default AddPage;
