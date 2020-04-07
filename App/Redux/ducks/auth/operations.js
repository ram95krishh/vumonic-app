import {
  loginAction,
} from './actions';

const login = dispatch => () => dispatch(loginAction());

const operations = {
  login,
};

export default operations;
