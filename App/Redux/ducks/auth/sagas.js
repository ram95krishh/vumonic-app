import {
  takeEvery,
  all,
  put,
  putResolve,
  select,
  call,
} from 'redux-saga/effects'
import Toast from 'react-native-simple-toast'

import {
  LOGIN_SAGA,
  SAVE_USER_INFO,
  SET_AUTHENTICATED
} from './types'
import {
  CLEAR_FEED
} from '../feed/types'

import AuthHelpers from './Helpers/firebaseAuth';
import API from '../../../Services/Api';

const api = API.create()

function * loginFirebase (provider) {
  const googleLoginData = yield call(AuthHelpers.googleLogin)
  const firebaseCredential = yield call(AuthHelpers.firebaseLogin, googleLoginData)
  return firebaseCredential
}


function* loginInit(api, { payload }) {
  try {
    const firebaseCredential = yield call(loginFirebase)
    let userData = AuthHelpers.shapeUserData(firebaseCredential)
    let response;
    if (firebaseCredential.additionalUserInfo.isNewUser) {
      response = yield call(api.saveUser, userData);
    } else {
      response = yield call(api.getUserByEmail, userData.email);
    }
    if (response.ok) {
      userData = response.data
      Toast.show("Logging you in....")
      const posts = yield select(state => state.feed.posts)
      if (posts.length) {
        yield put({ type: CLEAR_FEED  })
      }
      yield putResolve({ type: SAVE_USER_INFO, payload: userData })
      yield put({ type: SET_AUTHENTICATED })
    } else {
      throw new Error(response.originalError)
    }
  } catch (e) {
    Toast.show('Something went wrong, try again in sometime!')
    console.log('Oops! Sorry, Something went wrong!' + e.message)
  }
}

function* watchLoginInit() {
  yield takeEvery(LOGIN_SAGA, loginInit, api);
}

export const TestExports = {
  loginInit,
};

// eslint-disable-next-line
export function* combinedSagas() {
  yield all([
    watchLoginInit(),
  ]);
}
