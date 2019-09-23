import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // useful with cookies, mostly on post, put routes. 
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

//workerSaga: requests server to update specified user information
function* editUser(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    yield axios.put('/api/user', action.payload, config);
    yield put({ type: 'FETCH_USER' });
    yield put({ type: 'GET_USER_TROPHIES' });
    yield put({ type: 'GET_ANIMALS' });
  } catch (error) {
    console.log('error in editUser', error);
  }
}

//workerSaga: submits image data to server to add to AWS
function* addImage(action) {
  try {
    let response = yield axios.post('/api/image', action.payload)
    yield put({ type: 'SET_URI', payload: response.uri})
      .then((response) => {
        console.log('Successful POST', response);
        this.setState({
          processing: false,
          uploaded_uri: response.uri
        });
      })
  } catch (error) {
    console.log('error in addImage', error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('EDIT_USER', editUser);
  yield takeLatest('ADD_IMAGE', addImage);
}

export default userSaga;
