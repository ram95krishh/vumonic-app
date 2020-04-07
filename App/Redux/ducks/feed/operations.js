import {
  getFeedAction,
  togglePostLikeAction,
  getLikesAction
} from './actions';

const getFeed = dispatch => () => dispatch(getFeedAction());

const togglePostLike = dispatch => (payload) => dispatch(togglePostLikeAction(payload))

const getLikes = dispatch => payload => dispatch(getLikesAction(payload))

const operations = {
  getFeed,
  togglePostLike,
  getLikes
};

export default operations;
