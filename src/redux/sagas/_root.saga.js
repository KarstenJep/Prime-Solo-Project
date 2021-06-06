import { all, takeEvery } from 'redux-saga/effects';
import fetchBatch from './fetchBatch.saga';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import addBatch from './addBatch.saga';
import fetchDaily from './fetchDaily.saga';
import deleteBatch from './deleteBatch.saga';
import deleteHops from './deleteHops.saga';
import updateBatch from './update.saga';
import inventory from './inventory.saga';
import completeHop from './complete.saga';
import fetchUpdate from './fetchUpdate';
import fetchAdditions from './fetchAdditions.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield takeEvery('FETCH_BATCHES', fetchBatch);
  yield takeEvery('ADD_BATCH', addBatch);
  yield takeEvery('FETCH_DAILY', fetchDaily);
  yield takeEvery('DELETE_BATCH', deleteBatch);
  yield takeEvery('DELETE_HOPS', deleteHops);
  yield takeEvery('UPDATE_BATCH', updateBatch);
  yield takeEvery('FETCH_INVENTORY', inventory);
  yield takeEvery('COMPLETE_HOP', completeHop);
  yield takeEvery('FETCH_UPDATE', fetchUpdate);
  yield takeEvery('FETCH_ADDITIONS', fetchAdditions);
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    // batch(),
  ]);
}
