import { put } from '@redux-saga/core/effects';
import axios from 'axios';

function* completeHop( action ) {
    // Send completed addition to the DB via PUT
    console.log('in complete saga', action);
    try {
        yield axios.put( `/api/update/complete/${action.payload}`, action.payload );
        // Get all batches from server, including update. Sets daily reducer.
        yield put({type: 'FETCH_DAILY', payload: action.date});
        // // Update the update reducer
        // yield put({type: 'SET_UPDATE', payload: action.payload });

    } catch (error) {
        // alert(`Sorry. Things aren't working at the moment.`);
        console.log('Error completing hop', error);
    }
}

export default completeHop;