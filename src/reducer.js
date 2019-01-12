import * as Action from './actions';

export function reducer(state = initialState, action) {
  switch (action.type) {
    case Action.INCREASE_BREAK:
      return Object.assign({}, state, { breakLength: state.breakLength + 1 });
    case Action.DECREASE_BREAK:
      return Object.assign({}, state, { breakLength: state.breakLength - 1 });
    case Action.INCREASE_SESSION:
      return Object.assign({}, state, { sessionLength: state.sessionLength + 1 });
    case Action.DECREASE_SESSION:
      return Object.assign({}, state, { sessionLength: state.sessionLength - 1 });
    case Action.TOGGLE_PLAY:
      return Object.assign({}, state, { isRunning: !state.isRunning });
    case Action.RESET:
      return initialState;
    case Action.COUNT_DOWN:
      return Object.assign({}, state, { timeLeft: state.timeLeft - 1 });
    default:
      return state;
  }
}

const initialState = {
  breakLength: 5,//in minutes
  sessionLength: 25,//in minutes
  timeLeft: 25 * 60,//in seconds
  isRunning: false
};