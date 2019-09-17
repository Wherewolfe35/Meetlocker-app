import { takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//workerSaga: accepts data on new animal and sends it to the database
function* addAnimal(action) {
  try {
    yield axios.post('/api/animal', action.payload);
  } catch (error) {
    console.log('error in addAnimal', error);
  }
}

//root saga
function* animalSaga() {
  yield takeEvery('ADD_ANIMAL', addAnimal);
}

export default animalSaga