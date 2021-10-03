import { put } from '@redux-saga/core/effects';
import axios from 'axios';

function* fetchBatch() {
    try {
        const batches = yield axios.get('/api/batch');
        // console.log('fetch batch', batches.data);
        yield put({type: 'SET_BATCHES', payload: batches.data});
    } catch {
        console.log('get batches error');
    }
}

export default fetchBatch;