import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import moment, { updateLocale } from 'moment';

function AdditionsView() {
  const dispatch = useDispatch();
  const additions = useSelector((store) => store.additions);
  console.log('in additions', additions);

  useEffect(() => {
    // on page load, get list of additions from the database
    dispatch({ type: 'FETCH_ADDITIONS' });
  }, [])

  return (
    <div>
      <form className="formPanel5" >
        <h2>Additions</h2>
      </form>

       {additions.map(hops => {
         console.log('in additions map', hops)
         return (
           <p className="formPanel3"><b>{moment(hops.date).format('MM/DD')}</b> - {hops.hop_name} - <i>{hops.amount} {hops.unit}</i> - Tank {hops.tank}</p>
         )
       })}
   </div>
  );
}

export default AdditionsView;