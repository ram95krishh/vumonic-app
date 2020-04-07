import {
  SET_COMMENTS,
  SET_COMMENTS_LOADING,
  SET_MORE_COMMENTS,
  ADD_COMMENT_BEGIN,
  ADD_COMMENT_SUCCESS,
  DISABLE_PAGINATION,
  SET_COMMENTS_PAGINATING,
  UNDO_LAST_COMMENT_ADD
} from './types';

import { omit } from 'ramda'

import { createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const INITIAL_STATE = Immutable({
})

const setComments = (state, { payload: { postId, comments }}) => (state.merge({
  ...state,
  [postId]: {
    ...(state[postId] || {}),
    comments: comments
  }
}))

const setMoreComments = (state, { payload: { postId, comments }}) => (state.merge({
  ...state,
  [postId]: {
    ...state[postId],
    comments: state[postId].comments.concat(comments)
  }
}))

const setLoading = (state, { payload: { postId, loading }}) => (state.merge({
  ...state,
  [postId]: {
    ...(state[postId] || {}),
    loading
  }
}))

const addCommentBegin = (state, { payload: { postId, comment }}) => state.merge({
  ...state,
  [postId]: {
    ...state[postId],
    comments: [comment, ...(state[postId].comments || [])]
  }
})

const addCommentSuccess = (state, { payload: { postId, createdOn }}) => state.merge({
  ...state,
  [postId]: {
    comments: state[postId].comments.map(comment => {
      if (comment.adding) {
        return {
          ...omit(['adding'], comment),
          createdOn: createdOn
        }
      }
      return comment
    })
  }
})

const setCommentsPaginating = (state, { payload: { postId, paginating }}) => state.merge({
  ...state,
  [postId]: state[postId].set('paginating', paginating)
})

const disablePagination = (state, { payload: { postId }}) => state.merge({
  ...state,
  [postId]: state[postId].set('disablePagination', true)
})

const undoLastCommentAdd = (state, { payload: { postId }}) => state.merge({
  ...state,
  [postId]: {
    comments: state[postId].comments.filter(comment => !comment.adding)
  }
})

export default reducer = createReducer(INITIAL_STATE, {
  [SET_COMMENTS]: setComments,
  [SET_COMMENTS_LOADING]: setLoading,
  [SET_MORE_COMMENTS]: setMoreComments,
  [ADD_COMMENT_BEGIN]: addCommentBegin,
  [ADD_COMMENT_SUCCESS]: addCommentSuccess,
  [DISABLE_PAGINATION]: disablePagination,
  [SET_COMMENTS_PAGINATING]: setCommentsPaginating,
  [UNDO_LAST_COMMENT_ADD]: undoLastCommentAdd,
})
