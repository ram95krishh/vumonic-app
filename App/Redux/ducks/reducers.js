import { combineReducers } from 'redux'
import { reducers as auth } from './auth'
import { reducers as startup } from './startup'
import { reducers as feed } from './feed'
import { reducers as comments } from './comments'

const rootReducer = combineReducers({
  auth,
  feed,
  startup,
  comments
});

export default rootReducer;
