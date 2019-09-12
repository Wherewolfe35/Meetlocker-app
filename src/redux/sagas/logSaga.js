import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getLog(){
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    let response = yield axios.get('/api/log', config);
    yield put({ type: 'SET_LOG', payload: response.data });
  } catch (error) {
    console.log('error in getLog', error);
  }
}

function* addLog(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    yield axios.post('/api/log', action.payload, config);
    yield put({ type: 'GET_LOG' });
    yield put({ type: 'CLEAR_LOG' });
  } catch(error) {
    console.log('error in addLog', error);
  }
}

function* deleteLog(action){
  try {
    const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true, };
    yield axios.delete(`/api/log/${action.payload.id}/${action.payload.userId}`, config);
    yield put({type: 'GET_LOG'})
  } catch (error) {
    console.log('error in deleteLog', error);    
  }
}

function* logSaga(){
  yield takeEvery('GET_LOG', getLog);
  yield takeEvery('ADD_LOG', addLog);
  yield takeEvery('REMOVE_LOG', deleteLog);
}

export default logSaga;