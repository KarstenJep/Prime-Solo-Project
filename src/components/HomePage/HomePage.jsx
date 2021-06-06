import moment, { updateLocale } from 'moment';
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(.5),
      // padding: theme.spacing(.5),
      flexGrow: 1,
      itemAlign: 'center',
      
    },
  },
  button: {
    itemAlign: 'center'
  },
    paper: {
      padding: theme.spacing(.5),
      textAlign: 'center',
      color: theme.palette.text.primary,
    },
    
    
}));


function HomePage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const daily = useSelector((store) => store.daily);
  const [date, setDate] = useState(new Date());
  const weekday = moment().format('dddd');
  const id = moment().format('YYYY-MM-DD');
  const today = moment().format("MMMM Do");
  const dispatch = useDispatch();
  const [complete, setComplete] = useState('false');

  const classes = useStyles();
  
  console.log('in home', today, daily, user, date);
  console.log("moment", moment().format('YYYY MM DD')); 
  
  useEffect(() => {
    // on page load, get list of daily hop additions from the database
    dispatch({ type: 'FETCH_DAILY', payload: id });
  }, []) // daily

  const handleComplete = (id) => {
    console.log('Clicked complete', id);
    dispatch({ type: 'COMPLETE_HOP', payload: id,  });
  }

  const checkCompleted = () => {
    console.log('in checkCompleted', daily[0].complete);
    for (let addition of daily) {
      if(addition.complete === 'true') {
        return console.log('Done');
     }
      if (addition.complete == 'false')
        return console.log('yo');
    }
  }


  return (
    <>   
    <h2 className="formPanel5"><b>{weekday},<br></br>{today}</b></h2>
    
    {daily.map(addition => {
      console.log('in home map', addition, addition.complete);
      
      return (
        
        <div className="formPanel2" key={addition.hop_id}>
          
          <h3><b>{addition.name} {addition.style}</b></h3>
          <p><i> Tank: </i><b>{addition.tank}</b> / <i> Batch: </i><b>{addition.batch_num}</b></p>

          <p><i> Hop:</i><b> {addition.hop_name}</b>&nbsp; 
             / <i> Amount:</i> <b>{addition.amount} {addition.unit}</b> &nbsp;
               <button onClick={() => handleComplete(addition.hop_id)}>✔️</button></p>
        </div>
      )
    })}
    </>
  );
}


export default HomePage;
