import * as types from '../constants/types'

const INITIAL_STATE = {
  matches: []
};

export default function app (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_MATCHES:
      return {
        ...state, 
        matches: action.payload.map(match => ({...match}))
      };
    default:
      return state
  }
}
