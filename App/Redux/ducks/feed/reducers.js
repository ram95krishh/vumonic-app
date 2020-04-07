import {
  SET_FEED,
  SET_FETCHING,
  UPDATE_LIKES,
  DISABLE_LIKES_PAGINATION,
  SET_LIKES_LOADING,
  SET_LIKES,
  SET_LIKES_PAGINATING,
  INCREMENT_COMMENTS,
  CLEAR_FEED,
  ADD_LIKE,
  REMOVE_LIKE
} from './types';
import { pathOr, remove } from 'ramda'
import { createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'


const setFeed = (state, action) => state.merge({
  ...state,
  posts: state.posts.concat(action.payload)
})

const setFetching = (state, action) => state.merge({
  ...state,
  fetching: action.payload
})

const incrementComments = (state, { payload: { postId }}) => state.merge({
  ...state,
  posts: state.posts.map(post => {
    if (post.id === postId) {
      return post.merge({
        ...post,
        commentsCount: post.commentsCount + 1
      })
    }
    return post
  })
})

const updateLikesByPostId = (state, { payload }) => {
  const { id, isLiked, likesCount } = payload
  return state.merge({
    ...state,
    posts: state.posts.map(post => {
      if (post.id === id) {
        return post.merge({
          ...post,
          isLiked,
          likesCount
        })
      }
      return post
    })
  })
}

const setLoading = (state, { payload: { postId, loading }}) => (state.merge({
  ...state,
  likes: {
    ...state.likes,
    [postId]: {
      ...(state.likes && state.likes[postId] || {}),
      loading
    }
  }
}))

const setLikesPaginating = (state, { payload: { postId, paginating, loading }}) => state.merge({
  ...state,
  likes: {
    ...state.likes,
    [postId]: {
      ...state.likes[postId],
      paginating,
      loading
    }
  }
})

const disablePagination = (state, { payload: { postId }}) => state.merge({
  ...state,
  likes: {
    ...state.likes,
    [postId]: {
      ...(state.likes && state.likes[postId] || {}),
      disablePagination: true
    }
  }
})

const setLikes = (state, { payload: { postId, likes }}) => {
  const existingLikes = pathOr([], ['likes', postId, 'likes'] , state)
  return state.merge({
    ...state,
    likes: {
      ...state.likes,
      [postId]: {
        ...(state.likes && state.likes[postId] || {}),
        likes: existingLikes.concat(likes)
      }
    }
  })
}

const addLike = (state, { payload: { postId, user }}) => {
  const existingLikes = pathOr([], ['likes', postId, 'likes'] , state)
  if (!existingLikes.length) return state
  return state.merge({
    ...state,
    likes: {
      ...state.likes,
      [postId]: {
        ...(state.likes && state.likes[postId] || {}),
        likes: existingLikes.concat(user)
      }
    }
  })
}

const removeLike = (state, { payload: { postId, user }}) => {
  const existingLikes = pathOr([], ['likes', postId, 'likes'] , state)
  if (!existingLikes.length) return state
  return state.merge({
    ...state,
    likes: {
      ...state.likes,
      [postId]: {
        ...(state.likes && state.likes[postId] || {}),
        likes: existingLikes.filter(entry => entry.email !== user.email)
      }
    }
  })
}

const INITIAL_STATE = Immutable({
  fetching: true,
  posts: [],
  likes: {}
})

const clearFeed = (state) => state.merge(INITIAL_STATE)

export default reducer = createReducer(INITIAL_STATE, {
  [SET_FEED]: setFeed,
  [SET_FETCHING]: setFetching,
  [UPDATE_LIKES]: updateLikesByPostId,
  [DISABLE_LIKES_PAGINATION]: disablePagination,
  [SET_LIKES_LOADING]: setLoading,
  [SET_LIKES_PAGINATING]: setLikesPaginating,
  [SET_LIKES]: setLikes,
  [INCREMENT_COMMENTS]: incrementComments,
  [CLEAR_FEED]: clearFeed,
  [ADD_LIKE]: addLike,
  [REMOVE_LIKE]: removeLike
})
