import { all } from 'redux-saga/effects';
import { combinedSagas as authSagas } from './auth/sagas';
import { combinedSagas as startupSagas } from './startup/sagas';
import { combinedSagas as feedSagas } from './feed/sagas';
import { combinedSagas as commentSagas } from './comments/sagas';

export default function* root () {
  yield all([
    authSagas(),
    feedSagas(),
    startupSagas(),
    commentSagas()
  ]);
}
