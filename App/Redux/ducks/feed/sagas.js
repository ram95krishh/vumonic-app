import {
  all,
  call,
  takeLatest,
  putResolve,
  put,
  select
} from 'redux-saga/effects';
import { pathOr } from 'ramda'

import {
  SET_FEED,
  SET_FETCHING,
  GET_FEED_SAGA,
  TOGGLE_POST_LIKE_SAGA,
  UPDATE_LIKES,
  DISABLE_LIKES_PAGINATION,
  SET_LIKES_LOADING,
  GET_LIKES_SAGA,
  SET_LIKES,
  SET_LIKES_PAGINATING,
  ADD_LIKE,
  REMOVE_LIKE
} from './types'

import Toast from 'react-native-simple-toast'

import API from '../../../Services/Api';

const api = API.create()

function* getFeed (api) {
  try {
    const { _id = 0 } = yield select(state => state.auth.userInfo || {})
    yield put({ type: SET_FETCHING, payload: true })
    const posts = yield select(state => state.feed.posts || [])
    const count = posts.length
    const page = count / 20
    const payload = {
      page,
      count: 20,
      userId: _id
    }
    const response = yield call(api.getFeed, payload)
    if (response.ok) {
      feed = response.data
      yield putResolve({ type: SET_FEED, payload: feed })
      yield put({ type: SET_FETCHING, payload: false })
    } else {
      throw new Error(response.originalError)
    }
  } catch (e) {
    Toast.show('Sorry something went wrong!')
    console.log(e.message)
  }
}

function* toggleLike (api, { payload }) {
  try {
    let response
    const user = yield select(state => state.auth.userInfo)
    const { _id: userId } = user
    const req = {
      ...payload,
      userId
    }
    if (payload) {
      response = yield call(api.updateLikes, req)
    }
    if (response.ok) {
      const { isLiked, likesCount } = response.data
      const updatedLikes = {
        id: payload.postId,
        isLiked,
        likesCount
      }
      if (isLiked) {
        yield put({
          type: ADD_LIKE,
          payload: {
            postId: payload.postId,
            user
          }
        })
      } else {
        yield put({
          type: REMOVE_LIKE,
          payload: {
            postId: payload.postId,
            user
          }
        })
      }
      yield put({ type: UPDATE_LIKES, payload: updatedLikes })
    } else {
      throw new Error(response.originalError)
    }
  } catch (e) {
    Toast.show('Sorry something went wrong!')
    console.log(e.message)
  }
}

function* getLikes(api, { payload: { postId, firstCall = false }}) {
  try {
    const likes = yield select(state => pathOr([], ['feed', 'likes', postId, 'likes'], state))
    const disablePagination = yield select(state => pathOr(false, ['feed', 'likes', postId, 'disablePagination'], state))
    if ((likes && likes.length && firstCall) || disablePagination) {
      return
    }
    yield put({
      type: firstCall ? SET_LIKES_LOADING : SET_LIKES_PAGINATING,
      payload: {
        postId,
        loading: firstCall,
        paginating: !firstCall
      }
    })
    const req = {
      postId,
      skip: likes.length,
      count: 20,
    }
    const response = yield call(api.getLikesById, req)
    if (response.ok) {
      const likes = response.data
      if (likes.length === 0) {
        yield put({ type: DISABLE_LIKES_PAGINATION, payload: { postId }})
      } else {
        yield putResolve({
          type: SET_LIKES,
          payload: {
            postId,
            likes,
          }
        })
      }
      yield put({
        type: firstCall ? SET_LIKES_LOADING : SET_LIKES_PAGINATING,
        payload: {
          postId,
          loading: false,
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

function* watchGetFeedCall() {
  yield takeLatest(GET_FEED_SAGA, getFeed, api);
}

function* watchLikeButtonPress() {
  yield takeLatest(TOGGLE_POST_LIKE_SAGA, toggleLike, api)
}

function* watchGetLikesCall() {
  yield takeLatest(GET_LIKES_SAGA, getLikes, api)
}

export function* combinedSagas() {
  yield all([
    watchGetFeedCall(),
    watchLikeButtonPress(),
    watchGetLikesCall()
  ]);
}
