import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Typography from '@material-ui/core/Typography';

function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const daily = useSelector((store) => store.daily);

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
      {/* Current Date as title */}
      <div>
        <h2 className="formPanel5"><b>{today}</b></h2>
      </div> 
      {/* Daily Hop additions list */}
      {/* The ternary checks if there are hop additions for the day, if so it maps them out. If empty, displays message */}
      {daily.length > 0 ? daily.map(addition => {
        // console.log('in home map', addition);
        // Each addition checked for completion in next conditional
        if(addition.complete === false ) {
          return (
            // Uncomplete hop addition
            <div className="formPanel2" key={addition.hop_id}>
              <h3><b>{addition.name} {addition.style}</b></h3>
              <p><i>Tank:</i> <b>{addition.tank}</b></p>
              <p><i>Addition:</i> <b>{addition.hop_name} {addition.amount}{addition.unit}</b></p>
              <CheckBoxOutlinedIcon
                color="primary"
                cursor="pointer"
                style={{ fontSize: 45 }}
                onClick={() => handleComplete(addition.hop_id)}
                />
            </div>
          )
      }
        else {
            return (
              // Complete hop addition
              <div className="formPanel2">
                <h3><b>{addition.name} {addition.style}</b></h3>
                <CheckBoxIcon 
                  color="primary"
                  style={{ fontSize: 45 }}
                />
              </div>
            )
        }
      })
      : 
      // Message to display if there are no hop additions for the day
      <div className="formPanel2" >
      <Typography 
          variant="h5"
          style={{ textAlign: 'center', padding: '5vh'}}> 
          <b>No hop additions today, <br/> enjoy your break!</b>
          <br/>
          <CheckBoxIcon 
                  color="primary"
                  style={{ fontSize: 45 }}
                />
      </Typography>
      </div>
    }
    </>
  );
}

export default HomePage;
