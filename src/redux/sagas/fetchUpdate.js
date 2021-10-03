import { put } from '@redux-saga/core/effects';
import axios from 'axios';

function* fetchUpdate(action) {
    // console.log('F U', action.payload);
    try {
        const update = yield axios.get(`/api/update/${action.payload}`);
        // console.log('fetch batch to update', update.data);
        yield put({type: 'SET_UPDATE', payload: update.data});
    } catch {
        console.log('get update batch error');
    }
}

export default fetchUpdate;