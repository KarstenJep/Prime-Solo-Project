import { put } from '@redux-saga/core/effects';
import axios from 'axios';

function* completeHop( action ) {
    // Sent updates to the DB via PUT
    console.log('in complete saga', action.payload);
    try {
        yield axios.put( `/api/update/complete/${action.payload}`, action.payload );
        // Get all batches from server, including update. Sets daily reducer.
        // yield put({type: 'FETCH_DAILY'});
        // // Update the update reducer
        // yield put({type: 'SET_UPDATE', payload: action.payload });

    } catch (error) {
        // alert(`Sorry. Things aren't working at the moment.`);
        console.log('Error completing hop', error);
    }
}

export default completeHop;