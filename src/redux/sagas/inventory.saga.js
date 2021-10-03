import { put } from '@redux-saga/core/effects';
import axios from 'axios';

function* inventory() {
    try {
        const inventory = yield axios.get('/api/inventory');
        // console.log('fetch inventory', inventory.data);
        yield put({type: 'SET_INVENTORY', payload: inventory.data});
    } catch {
        console.log('get inventory error');
    }
}

export default inventory;