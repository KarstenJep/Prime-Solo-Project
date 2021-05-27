import moment from 'moment';
import React, { useEffect, useState } from 'react';
// import LogOutButton from '../LogOutButton/LogOutButton';
import {useDispatch, useSelector} from 'react-redux';
import DateTime from '../Date/Date';

function HomePage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  // const batches = useSelector((store) => store.batch);
  const daily = useSelector((store) => store.daily);
  const [date, setDate] = useState(new Date());
  const weekday = moment().format('dddd');
  const id = moment().format('YYYY-MM-DD')
  const dispatch = useDispatch();
  
  console.log('in home', daily, user, date);
  console.log("moment", moment().format('YYYY MM DD')); 
  Number(id)
console.log(id);
  useEffect(() => {
    // on page load, get list of batches from the database
    dispatch({ type: 'FETCH_DAILY', payload: id });
  }, [])

  const completed = () => {}

  return (
    <>
    <div className="">
      <h2>Welcome, Karsten!</h2>
    </div>
    <div>
            {/* <p>{date.toLocaleDateString()}</p> */}
            <h2>{weekday}, {date.getMonth() + 1}/{date.getDate()}</h2>
    </div>
    
    {daily.map(addition => {
      console.log('in home map', addition);
      return (
        <div key={addition.hop_id}>
          <h4>{addition.name}</h4>
          <p> Tank: {addition.tank} / Batch: {addition.batch_num}</p>
          <p> Hop: {addition.hop_name}&nbsp; 
              / Amount: {addition.amount}{addition.unit}&nbsp;
              / <button onClick={completed}>✅</button></p>
        </div>
      )
    })}
    </>
  );
}


export default HomePage;
