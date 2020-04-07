import {
  getCommentsAction,
  getMoreCommentsAction,
  addCommentAction
} from './actions';

const getComments = dispatch => (payload) => dispatch(getCommentsAction(payload));

const getMoreComments = dispatch => (payload) => dispatch(getMoreCommentsAction(payload));

const addComment = dispatch => payload => dispatch(addCommentAction(payload))

const operations = {
  getComments,
  getMoreComments,
  addComment
};

export default operations;
