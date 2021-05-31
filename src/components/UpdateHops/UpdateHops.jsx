import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';


function UpdateHops() {
  const dispatch = useDispatch();
  const update = useSelector((store) => store.update);
  console.log('in update hops', update);

  return (
    <div>
      <h2>{heading}</h2>
    </div>
  );
}

export default UpdateHops;
