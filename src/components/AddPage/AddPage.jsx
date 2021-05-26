import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from "react-router";
import HopForm from '../HopForm/HopForm';



function AddPage() {
  const [name, setName] = useState('');
  const [tank, setTank] = useState('');
  const [batch, setBatch] = useState('');
  const hops = useSelector((store) => store.hops);

  console.log('in AP', hops);
  
  const submitForm = (e) => {}



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
        <HopForm />
        <button type="submit">Save Batch</button>
      </form>
      
    </div>
  );
}

export default AddPage;
