import { store } from './Redux';

export const INCREASE_BREAK = 'INCREASE_BREAK';
export const DECREASE_BREAK = 'DECREASE_BREAK';
export const INCREASE_SESSION = 'INCREASE_SESSION';
export const DECREASE_SESSION = 'DECREASE_SESSION';
export const TOGGLE_PLAY = 'TOGGLE_PLAY';
export const RESET = 'RESET';
export const COUNT_DOWN = 'COUNT_DOWN';

//Action creator
export const increaseBreak = () => ({ type: INCREASE_BREAK });
export const decreaseBreak = () => ({ type: DECREASE_BREAK });
export const increaseSession = () => ({ type: INCREASE_SESSION });
export const decreaseSession = () => ({ type: DECREASE_SESSION });
export const togglePlay = () => ({ type: TOGGLE_PLAY });
export const reset = () => ({ type: RESET });
export const countDown = () => ({ type: COUNT_DOWN });

export function startCountDown() {
  store.dispatch(togglePlay());
  return (dispatch, getState) => {
    var refreshIntervalId = setInterval(() => {
      const { isRunning } = getState();
      if (!isRunning) {
        clearInterval(refreshIntervalId);
        return;
      }
      dispatch(countDown());
    }, 1000);
  };
}