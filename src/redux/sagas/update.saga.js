import { put } from '@redux-saga/core/effects';
import axios from 'axios';


function* updateBatch( action ) {
    // Sent updates to the DB via PUT
    // console.log('in update saga', action.payload);
    try {
        yield axios.put( `/api/update`, action.payload );
        // Get all batches from server, including update. Sets batch reducer.
        yield put({type: 'FETCH_BATCH'});
        // // Update the update reducer
        // yield put({type: 'SET_UPDATE', payload: action.payload });

    } catch (error) {
        // alert(`Sorry. Things aren't working at the moment.`);
        console.log('Error updating batch', error);
    }
}

export default updateBatch;
