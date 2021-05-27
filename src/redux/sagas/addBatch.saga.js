import { put } from '@redux-saga/core/effects';
import axios from 'axios';

function* addBatch( action ) {
    // post movies to the DB
    try {
        yield axios.post( '/api/batch', action.payload );
        yield put({type: 'FETCH_BATCH'});

    } catch (error) {
        // alert(`Sorry. Things aren't working at the moment.`);
        console.log('Error adding batch', error);
    }
}

export default addBatch;
