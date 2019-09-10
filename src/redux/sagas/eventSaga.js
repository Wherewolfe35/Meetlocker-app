import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getEvents() {
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
  } catch (error) {
    console.log('error in getEvents', error);
  }
}

function* addEvent(action) {
try{
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };
  yield axios.post('/api/event', action.payload, config)
  yield put({
    type: 'GET_EVENTS'
  });
  yield put({
    type: 'EVENT_ADDED'
  })
} catch(error) {
  console.log('error in addEvent', error);
  yield put({
    type: 'EVENT_ERROR',
  })
}
}

function* eventSaga() {
  yield takeLatest('GET_EVENTS', getEvents);
  yield takeLatest('ADD_EVENT', addEvent);
}

export default eventSaga;