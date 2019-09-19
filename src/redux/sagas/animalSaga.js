import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//workerSaga: accepts data on new animal and sends it to the database
function* addAnimal(action) {
  try {
    yield axios.post('/api/animal', action.payload);
  } catch (error) {
    console.log('error in addAnimal', error);
  }
}

//workerSaga: collects all information on the specified user's trophies
function* getUserTrophies() {
  try {
    let response = yield axios.get('/api/animal');
    yield put({ type: 'SET_USER_TROPHIES', payload: response.data });
  } catch (error) {
    console.log('error in getUserTrophies', error);
  }
}

//root saga
function* animalSaga() {
  yield takeEvery('ADD_ANIMAL', addAnimal);
  yield takeEvery('GET_USER_TROPHIES', getUserTrophies);
}

export default animalSaga