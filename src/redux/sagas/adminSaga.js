import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//workerSaga: Requests all unapproved users and trophies from the database
function* getAdmin() {
  try {
    let trophyResponse = yield axios.get('/api/admin/trophy');
    let userResponse = yield axios.get('/api/admin/user');
    yield put({ type: 'SET_ADMIN_TROPHY', payload: trophyResponse.data});
    yield put({ type: 'SET_ADMIN_USER', payload: userResponse.data});
  } catch (error) {
    console.log('error in getAdmin', error);
  }
}

//rootSaga
function* adminSaga(){
  yield takeEvery('GET_UNAPPROVED', getAdmin);
}

export default adminSaga;