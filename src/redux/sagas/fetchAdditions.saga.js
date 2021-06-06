import { put } from '@redux-saga/core/effects';
import axios from 'axios';

function* additions() {
    try {
        const additions = yield axios.get('/api/inventory/additions');
        console.log('fetch additions', additions.data);
        yield put({type: 'SET_ADDITIONS', payload: additions.data});
    } catch {
        console.log('get additions error');
    }
}

export default additions;