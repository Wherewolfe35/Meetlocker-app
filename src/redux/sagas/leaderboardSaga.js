import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//worker saga: requests data from database on bagged animals for each user
function* getUsers() {
  try {
    const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true, };
    let response = yield axios.get('/api/leaderboard', config);
    yield put({ type: 'SET_LEADERBOARD_USERS', payload: response.data });
  } catch (error) {
    console.log('error in getUsers', error);
  }
}

//worker saga: request list of animals from the database
function* getAnimals() {
  try {
    const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true, };
    let response = yield axios.get('/api/leaderboard/animals', config);
    yield put({ type: 'SET_ANIMALS', payload: response.data })
  } catch (error) {
    console.log('error in getAnimals', error);
  }
}

//root saga
function* leaderboardSaga() {
  yield takeEvery('GET_LEADERBOARD_USERS', getUsers);
  yield takeEvery('GET_ANIMALS', getAnimals);
}

export default leaderboardSaga;