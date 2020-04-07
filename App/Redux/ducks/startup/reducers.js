import {
  OPEN_ADD_WIDGET,
  CLOSE_ADD_WIDGET,
  OPEN_EDIT_WIDGET,
  CLOSE_EDIT_WIDGET,
  OPEN_TRUNCATE_WIDGET,
  CLOSE_TRUNCATE_WIDGET,
} from './types';
import { createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const reducer = (state = Immutable({}), action) => {
  switch (action.type) {
    case OPEN_ADD_WIDGET: {
      return {
        ...state,
        openAddWidget: true,
      };
    }

    case CLOSE_ADD_WIDGET: {
      return {
        ...state,
        openAddWidget: false,
      };
    }

    case OPEN_EDIT_WIDGET: {
      return {
        ...state,
        openEditWidget: true,
      };
    }

    case CLOSE_EDIT_WIDGET: {
      return {
        ...state,
        openEditWidget: false,
      };
    }

    case OPEN_TRUNCATE_WIDGET: {
      return {
        ...state,
        openTruncateWidget: true,
      };
    }

    case CLOSE_TRUNCATE_WIDGET: {
      return {
        ...state,
        openTruncateWidget: false,
      };
    }

    default:
      return state;
  }
};

export default reducer;
