import * as Action from './actions';

export function reducer(state = initialState, action) {
  let sessionLength = state.sessionLength;
  let breakLength = state.breakLength;

  switch (action.type) {
    case Action.INCREASE_BREAK:
      if (state.isRunning) return state;
      if (breakLength < 60) breakLength++;
      return Object.assign({}, state, { breakLength });

    case Action.DECREASE_BREAK:
      if (state.isRunning) return state;
      if (breakLength > 1) breakLength--;
      return Object.assign({}, state, { breakLength });

    case Action.INCREASE_SESSION:
      if (state.isRunning) return state;
      if (sessionLength < 60) sessionLength++;
      return Object.assign({}, state, { sessionLength, timeLeft: sessionLength * 60 });

    case Action.DECREASE_SESSION:
      if (state.isRunning) return state;
      if (sessionLength > 1) sessionLength--;
      return Object.assign({}, state, { sessionLength, timeLeft: sessionLength * 60 });

    case Action.TOGGLE_PLAY:
      return Object.assign({}, state, { isRunning: !state.isRunning });

    case Action.RESET:
      return initialState;

    case Action.COUNT_DOWN:
      let timeLeft = state.timeLeft - 1;
      let isInBreak = state.isInBreak;
      if (timeLeft < 0) {
        isInBreak = !isInBreak;
        timeLeft = isInBreak ? state.breakLength * 60 : state.sessionLength * 60;
      }
      return Object.assign({}, state, { timeLeft, isInBreak });

    default:
      return state;
  }
}

const initialState = {
  breakLength: 5,//in minutes
  sessionLength: 25,//in minutes
  timeLeft: 25 * 60,//in seconds
  isInBreak: false,
  isRunning: false
};