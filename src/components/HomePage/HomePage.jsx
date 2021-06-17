import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';

function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const daily = useSelector((store) => store.daily);
  const [complete, setComplete] = useState('false');

  // Import and format current date via moment.js
  const date = moment().format('YYYY-MM-DD');
  const today = moment().format("dddd, MMMM Do");
  
  // console.log('in home', today, daily, user);
 
  // on page load, get list of daily hop additions from the database
  useEffect(() => {
    dispatch({ type: 'FETCH_DAILY', payload: date });
  }, []) 

  // Click handler for marking a hop addition complete, and then refresh daily list
  const handleComplete = (id) => {
    // console.log('Clicked complete', id, date);
    dispatch({ type: 'COMPLETE_HOP', payload: id, date });
  }

  return (
    <>
      <div>
        <h2 className="formPanel5"><b>{today}</b></h2>
      </div>

      {daily.map(addition => {
        // console.log('in home map', addition);
        if(addition.complete === false ) {
          return (
            <div className="formPanel2" key={addition.hop_id}>
              <h3><b>{addition.name} {addition.style}</b></h3>
              <p><i>Tank:</i> <b>{addition.tank}</b> / <i>Batch:</i> <b>{addition.batch_num}</b></p>
              <p><i>Hop:</i> <b>{addition.hop_name}</b> / <i>Amount:</i> <b>{addition.amount} {addition.unit}</b>&nbsp;
              <button onClick={() => handleComplete(addition.hop_id)}>✔️</button></p>
            </div>
          )
      }
        else {
            return (
              <div className="formPanel2" key={addition.hop_id}>
                <h3><b>{addition.name} {addition.style}&nbsp; ✔️</b></h3> 
              </div>
            )
        }
      })}
    </>
  );
}

export default HomePage;
