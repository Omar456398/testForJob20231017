import { combineReducers } from 'redux';
import { ADD_DATA, REPLACE_DATA } from './actionNames';
import { MovieData} from '../tabs/types'

type ActionPayload = {
    data?: MovieData[],
    totalPages: number
}
type Action = {
    type: string,
    payload: ActionPayload
}
export type StateGlobal = {
    data: ActionPayload
}

const initialState = {
  data: [],
  totalPages: 1
};


const dataReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ADD_DATA:
        return { ...state, ...action.payload, data: [ ...state.data, ...(action.payload.data || [])] };
    case REPLACE_DATA:
        return { ...state, ...action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  data: dataReducer,
});

export default rootReducer;
