import {
  takeEvery,
  takeLatest,
  all,
  put,
  putResolve,
  select,
  call,
} from 'redux-saga/effects'
import { pathOr } from 'ramda'
import { Keyboard } from 'react-native'
import Toast from 'react-native-simple-toast'

import {
  INCREMENT_COMMENTS
} from '../feed/types';
import API from '../../../Services/Api';

const api = API.create()

const {
  GET_COMMENTS_SAGA,
  SET_COMMENTS,
  SET_COMMENTS_LOADING,
  GET_MORE_COMMENTS_SAGA,
  SET_COMMENTS_PAGINATING,
  SET_MORE_COMMENTS,
  DISABLE_PAGINATION,
  ADD_COMMENT_SAGA,
  ADD_COMMENT_BEGIN,
  ADD_COMMENT_SUCCESS,
  UNDO_LAST_COMMENT_ADD
} = require('./types')

function* getComments (api, { payload: { postId }}) {
  try {
    const existingComments = yield select(state => pathOr([], ['comments', postId, 'comments'], state))
    const commentsCount = existingComments.length

    const disablePagination = yield select(state => pathOr(false, ['comments', postId, 'disablePagination'], state))
    if (commentsCount || disablePagination) { return }

    yield put({
      type: SET_COMMENTS_LOADING,
      payload: {
        postId,
        loading: true
      }
    })
    const req = {
      postId,
      skip: 0,
      count: 10,
    }
    const response = yield call(api.getCommentsById, req)
    if (response.ok) {
      const comments = response.data
      if (comments.length === 0) {
        yield put({ type: DISABLE_PAGINATION, payload: { postId }})
      } else {
        yield putResolve({
          type: SET_COMMENTS,
          payload: {
            postId,
            comments,
          }
        })
      }
      yield put({
        type: SET_COMMENTS_LOADING,
        payload: {
          postId,
          loading: false
        }
      })
    } else {
      throw new Error(response.originalError)
    }
  } catch (e) {
    Toast.show('Sorry something went wrong!')
    console.log(e)
  }
}

function* getMoreComments(api, { payload: { postId }}) {
  try {
    const disablePagination = yield select(state => pathOr(false, ['comments', postId, 'disablePagination'], state))
    if (disablePagination) { return }

    const existingComments = yield select(state => pathOr([], ['comments', postId, 'comments'], state))
    const commentsCount = existingComments.length
    yield put({
      type: SET_COMMENTS_PAGINATING,
      payload: {
        postId,
        paginating: true
      }
    })
    const req = {
      postId,
      skip: commentsCount,
      count: 10,
    }
    const response = yield call(api.getCommentsById, req)
    if (response.ok) {
      const comments = response.data
      if (comments.length === 0) {
        yield put({ type: DISABLE_PAGINATION, payload: { postId }})
      } else {
        yield putResolve({
          type: SET_MORE_COMMENTS,
          payload: {
            postId,
            comments,
          }
        })
      }
      yield put({
        type: SET_COMMENTS_PAGINATING,
        payload: {
          postId,
          paginating: false
        }
      })
    } else {
      throw new Error(response.originalError)
    }
  } catch (e) {
    Toast.show('Sorry something went wrong!')
    console.log(e.message)
  }
}

function* addComment(api, { payload: { postId, inputText, successCallback }}) {
  try {
    const user = yield select(state => state.auth.userInfo || {})
    if (!user) return
    const payload = {
      postId,
      comment: {
        body: inputText.trim(),
        adding: true,
        user,
      }
    }
    yield putResolve({
      type: ADD_COMMENT_BEGIN,
      payload,
    })
    const commentPayload = {
      postId,
      data: {
        body: inputText.trim(),
        user: user._id,
      }
    }
    const response = yield call(api.addComment, commentPayload)
    if (response.ok) {
      yield put({
        type: ADD_COMMENT_SUCCESS,
        payload: {
          postId,
          createdOn: Date.now(),
        }
      })
      yield put({
        type: INCREMENT_COMMENTS,
        payload: {
          postId,
        }
      })
      successCallback()
    } else {
      throw new Error(response.originalError)
    }
  } catch (e) {
    try {
      yield put({
        type: UNDO_LAST_COMMENT_ADD,
        payload: {
          postId
        }
      })
    } catch (e) {}
    Keyboard.dismiss()
    Toast.show('Sorry something went wrong!', Toast.LONG, Toast.TOP)
    console.log(e.message)
  }
}

function* watchCommentsCall() {
  yield takeLatest(GET_COMMENTS_SAGA, getComments, api);
}

function* watchMoreCommentsCall() {
  yield takeLatest(GET_MORE_COMMENTS_SAGA, getMoreComments, api);
}

function* watchAddCommentCall() {
  yield takeLatest(ADD_COMMENT_SAGA, addComment, api)
}

export function* combinedSagas() {
  yield all([
    watchCommentsCall(),
    watchMoreCommentsCall(),
    watchAddCommentCall()
  ]);
}
