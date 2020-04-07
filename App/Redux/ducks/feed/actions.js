import {
  GET_FEED_SAGA,
  TOGGLE_POST_LIKE_SAGA,
  GET_LIKES_SAGA
} from './types';

const getFeedAction = () => ({
  type: GET_FEED_SAGA,
});

const togglePostLikeAction = payload => ({
  type: TOGGLE_POST_LIKE_SAGA,
  payload
})

const getLikesAction = payload => ({
  type: GET_LIKES_SAGA,
  payload
})

export {
  getFeedAction,
  togglePostLikeAction,
  getLikesAction
};
