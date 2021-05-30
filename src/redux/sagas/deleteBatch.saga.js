import { put } from '@redux-saga/core/effects';
import axios from 'axios';

function* deleteBatch(action) {
    try {
        yield axios.delete(`/api/batch/${action.payload}`);
        yield put({ type: 'FETCH_BATCHES' });
        
    } catch (error) {
        // alert(`Sorry things aren't working at the moment. Try again later.`);
        console.log('Error deleting item', error);
    }
}

export default deleteBatch;