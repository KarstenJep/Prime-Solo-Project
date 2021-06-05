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
  const today = moment().format("dddd, MMMM Do");
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
    <div>
          
          {/* <h2>{weekday}, {date.getMonth() + 1}/{date.getDate()}</h2> */}
          {/* <h1 className={classes.root}><b>{today}</b></h1> */}
          <Box className="formPanel4" ml={2}>
          <h3 >Welcome, Karsten!</h3>
          <h1 ><b>&nbsp;{today}</b></h1>
          </Box>
    </div>
    {/* {daily = daily.filter()} */}
    {daily.map(addition => {
      // {checkCompleted()}
      console.log('in home map', addition, addition.complete);
      // setComplete(addition.complete)
      // {complete == false ?
      
      return (
        
        <div className="formPanel2" key={addition.hop_id}>
          
          <h4><b>{addition.name} {addition.style}</b></h4>
          <p><b><i> Tank: </i></b>{addition.tank} / <b><i> Batch: </i></b>{addition.batch_num}</p>

          <p><b><i> Hop:</i></b> {addition.hop_name}&nbsp; 
             / <b><i> Amount:</i></b> {addition.amount} {addition.unit} &nbsp;
               <button onClick={() => handleComplete(addition.hop_id)}>✔️</button></p>
        </div>
      )
      // :
        // <h4>Done!</h4>
      // }
    })}
    </>
  );
}


export default HomePage;
