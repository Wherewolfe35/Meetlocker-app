import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getLog(){
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    let response = yield axios.get('/api/log', config);
    yield put({
      type: 'SET_LOG',
      payload: response.data
    })
  } catch (error) {
    console.log('error in getLog', error);
  }
}

function* logSaga(){
  yield takeEvery('GET_LOG', getLog);
}

export default logSaga;