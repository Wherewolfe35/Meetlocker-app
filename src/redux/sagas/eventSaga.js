import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker saga: obtains all events from database and sends it to the reducer
function* getEvents() {
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
// worker saga: sends new event to database, starts new GET request, and clears currentevent reducer. 
function* addEvent(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    yield axios.post('/api/event', action.payload, config);
    yield put({
      type: 'GET_EVENTS'
    });
    yield put({
      type: 'EVENT_ADDED'
    });
  } catch (error) {
    console.log('error in addEvent', error);
    yield put({
      type: 'EVENT_ERROR',
    })
  }
}
// worker saga: requests selected event to be removed from the database
function* removeEvent(action) {
  try{
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    yield axios.delete(`/api/event/${action.payload}`, config);
    yield put({
      type: 'GET_EVENTS'
    });
  } catch(error) {
    console.log('error in removeEvent', error);
  }
}
// root saga
function* eventSaga() {
  yield takeLatest('GET_EVENTS', getEvents);
  yield takeLatest('ADD_EVENT', addEvent);
  yield takeLatest('REMOVE_EVENT', removeEvent);
}

export default eventSaga;