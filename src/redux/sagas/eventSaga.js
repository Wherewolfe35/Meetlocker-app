import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getEvents(){
  console.log('hello from getEvents');
try {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };
  const response = yield axios.get('/api/event', config);
  yield put({
    type: "SET_EVENTS",
    payload: response.data
  })
} catch(error){
  console.log('error in getEvents', error);
}
}

function* eventSaga(){
  yield takeLatest('GET_EVENTS', getEvents);
}

export default eventSaga;