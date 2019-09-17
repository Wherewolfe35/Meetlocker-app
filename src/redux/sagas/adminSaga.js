import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

const config = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
};

//workerSaga: Requests all unapproved users and trophies from the database
function* getAdmin() {
  try {
    let trophyResponse = yield axios.get('/api/admin/trophy');
    let userResponse = yield axios.get('/api/admin/user');
    yield put({ type: 'SET_ADMIN_TROPHY', payload: trophyResponse.data });
    yield put({ type: 'SET_ADMIN_USER', payload: userResponse.data });
  } catch (error) {
    console.log('error in getAdmin', error);
  }
}

//workerSaga: Reqest deletion of specified user
function* disapproveUser(action) {
  try {
    yield axios.delete(`/api/admin/user/${action.payload}`, config);
    yield put({ type: 'GET_UNAPPROVED' });
  } catch (error) {
    console.log('error in disapproveUser', error);
  }
}

//workerSaga: Request approval of specified user
function* approveUser(action) {
  try {
    yield axios.put('/api/admin/user', {id:action.payload}, config);
    yield put({ type: 'GET_UNAPPROVED' });
  } catch (error) {
    console.log('error in approveUser', error);
  }
}

//workerSaga: Reqest deletion of specified trophy
function* disapproveTrophy(action) {
  try {
    yield axios.delete(`/api/admin/trophy/${action.payload}`, config);
    yield put({ type: 'GET_UNAPPROVED' });
  } catch (error) {
    console.log('error in disapproveTrophy', error);
  }
}

//workerSaga: Request approval of specified trophy
function* approveTrophy(action) {
  try {
    yield axios.put('/api/admin/trophy', { id: action.payload }, config);
    yield put({ type: 'GET_UNAPPROVED' });
  } catch (error) {
    console.log('error in approveTrophy', error);
  }
}

//rootSaga
function* adminSaga() {
  yield takeEvery('GET_UNAPPROVED', getAdmin);
  yield takeEvery('DISAPPROVE_USER', disapproveUser);
  yield takeEvery('APPROVE_USER', approveUser);
  yield takeEvery('DISAPPROVE_TROPHY', disapproveTrophy);
  yield takeEvery('APPROVE_TROPHY', approveTrophy);
}

export default adminSaga;