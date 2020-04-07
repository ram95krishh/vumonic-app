import {
  all,
  call,
  takeLatest,
} from 'redux-saga/effects';
import { GoogleSignin } from '@react-native-community/google-signin'

import {
  INIT_START_UP_TASKS_SAGA
} from './types'

function* initStartUpTasks () {
  const success = yield call(GoogleSignin.configure)
  console.log(success);
}

function* watchStartupTasksInit() {
  yield takeLatest(INIT_START_UP_TASKS_SAGA, initStartUpTasks);
}

export function* combinedSagas() {
  yield all([
    watchStartupTasksInit(),
  ]);
}
