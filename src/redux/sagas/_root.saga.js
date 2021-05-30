import { all, takeEvery } from 'redux-saga/effects';
import fetchBatch from './fetchBatch.saga';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import addBatch from './addBatch.saga';
import fetchDaily from './fetchDaily.saga';
import deleteBatch from './deleteBatch.saga';

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
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    // batch(),
  ]);
}
