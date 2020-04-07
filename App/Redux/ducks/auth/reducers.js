import {
  SAVE_USER_INFO,
  SET_AUTHENTICATED,
} from './types';
import { createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const INITIAL_STATE = Immutable({
  isAuthenticated: false
})

const saveUserInfo = (state, action) => ({
  ...state,
  userInfo: action.payload,
})

const setAuthenticated = state => ({
  ...state,
  isAuthenticated: true,
})

export default reducer = createReducer(INITIAL_STATE, {
  [SAVE_USER_INFO]: saveUserInfo,
  [SET_AUTHENTICATED]: setAuthenticated,
})
