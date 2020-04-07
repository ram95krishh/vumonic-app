import {
  GET_COMMENTS_SAGA,
  GET_MORE_COMMENTS_SAGA,
  ADD_COMMENT_SAGA
} from './types';

const getCommentsAction = (payload) => ({
  type: GET_COMMENTS_SAGA,
  payload,
});

const getMoreCommentsAction = (payload) => ({
  type: GET_MORE_COMMENTS_SAGA,
  payload
})

const addCommentAction = payload => ({
  type: ADD_COMMENT_SAGA,
  payload,
})

export {
  getCommentsAction,
  getMoreCommentsAction,
  addCommentAction
};
