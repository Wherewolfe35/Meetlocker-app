import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addComment(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    yield axios.post('/api/comment', action.payload, config);
    yield put({
      type: 'GET_LOG'
    });
  } catch (error) {
    console.log('error in addComment', error);
  }
}

function* getComments(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    let response = yield axios.get(`/api/comment/${action.payload}`, config);
    yield put({
      type: 'SET_COMMENTS',
      payload: response.data
    })
  } catch (error) {
    console.log('error in getComments', error);
  }
}

function* removeComment(action) {
  try {
    const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true, };
    yield axios.delete(`/api/comment/${action.payload.id}/${action.payload.userId}`, config);
    yield put({ type: 'GET_COMMENTS', payload: action.payload.id })
  } catch (error) {
    console.log('error in deleteComment', error);
  }
}

function* commentSaga(){
  yield takeEvery('ADD_COMMENT', addComment);
  yield takeEvery('GET_COMMENTS', getComments);
  yield takeEvery('REMOVE_COMMENT', removeComment);
}

export default commentSaga