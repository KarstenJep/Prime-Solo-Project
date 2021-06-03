import { put } from '@redux-saga/core/effects';
import axios from 'axios';

function* deleteSaga(action) {
    try {
        yield axios.delete(`/api/batch/hops/${action.payload}`);
        console.log('in delete saga', action.payload);
        yield put({ type: 'FETCH_BATCHES' });
    } catch (error) {
        // alert(`Sorry things aren't working at the moment. Try again later.`);
        console.log('Error deleting', error);
    }
}

export default deleteSaga;