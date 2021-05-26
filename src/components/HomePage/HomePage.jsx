import React, { useEffect, useState } from 'react';
// import LogOutButton from '../LogOutButton/LogOutButton';
import {useDispatch, useSelector} from 'react-redux';
import DateTime from '../Date/Date';

function HomePage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const batch = useSelector((store) => store.batch);
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  
  console.log('in home', batch, user);
  console.log('in date', date.getUTCFullYear);


  // useEffect(() => {
  //   // on page load, get list of batches from the database
  //   dispatch({ type: 'FETCH_BATCHES' });
  // }, [])
if (date.getUTCFullYear) {
  
}

  return (
    <>
    <div>
            <p>{date.toLocaleDateString()}</p>
            <p>{date.getDay()} {date.getMonth() + 1}/{date.getDate()}</p>
    </div>
    
    {batch.map(today => {
      console.log('in home map', today);
      return (
        <div key={today.hop_id}>
          <h3>{today.name}</h3>
        </div>
      )
    })}
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>It's time to party #{user.id}</p>
    </div>
    </>
  );
}

// this allows us to use <App /> in index.js
export default HomePage;
