import { put } from '@redux-saga/core/effects';
import axios from 'axios';

function* fetchDaily(action) {
    // console.log('in daily saga', action);
    try {
        const additions = yield axios.get(`/api/daily/${action.payload}`);
        // console.log('fetch daily addition', additions.data);
        yield put({type: 'SET_DAILY', payload: additions.data});
    } catch {
        console.log('get daily error');
    }
}

export default fetchDaily;