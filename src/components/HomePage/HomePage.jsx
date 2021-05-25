import React, { useEffect } from 'react';
// import LogOutButton from '../LogOutButton/LogOutButton';
import {useDispatch, useSelector} from 'react-redux';
import DateTime from '../Date/Date';

function HomePage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const batch = useSelector((store) => store.batch);
  const dispatch = useDispatch();
  
  console.log('in home', batch, user);

  useEffect(() => {
    // on page load, get list of batches from the database
    dispatch({ type: 'FETCH_BATCHES' });
  }, [])

  return (
    <>
    <DateTime />
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>It's time to party #{user.id}</p>
      {/* <LogOutButton className="btn" /> */}
    </div>
    </>
  );
}

// this allows us to use <App /> in index.js
export default HomePage;
