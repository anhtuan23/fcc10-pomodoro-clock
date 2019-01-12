import React  from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleUp, faChevronCircleDown, faClock, faPlayCircle, faPauseCircle, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { connect } from "react-redux";
import { increaseBreak, decreaseBreak, increaseSession, decreaseSession, reset, startCountDown } from "./actions";

library.add(faChevronCircleUp, faChevronCircleDown, faClock, faPlayCircle, faPauseCircle, faSyncAlt);

const Pomodoro = ({ breakLength, sessionLength, timeLeft, isRunning, increaseBreak, decreaseBreak,
  increaseSession, decreaseSession, togglePlay, reset }) => (
    <div className="wrappper center">
      <div className="center center-row">
        <FontAwesomeIcon icon="clock" className="icon" id="app-icon" />
        <h1>Pomodoro Clock</h1>
      </div>
      <div className="center center-row">
        <Controller name="Break Length" id="break-label" value={breakLength} onIncrease={increaseBreak} onDecrease={decreaseBreak}/>
        <Controller name="Session Length" id="session-label" value={sessionLength} onIncrease={increaseSession} onDecrease={decreaseSession}/>
      </div>
      <Clock time={timeLeft} />
      <Buttons isRunning={isRunning} togglePlay={togglePlay} reset={reset}/>
    </div>
  );


const mapStateToProps = state => ({ ...state });
const mapDispatchToProps = dispatch => (
  {
    increaseBreak: () => dispatch(increaseBreak()),
    decreaseBreak: () => dispatch(decreaseBreak()),
    increaseSession: () => dispatch(increaseSession()),
    decreaseSession: () => dispatch(decreaseSession()),
    togglePlay: () => dispatch(startCountDown()),
    reset: () => dispatch(reset())
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Pomodoro);

const Controller = ({ name, id, value, onIncrease, onDecrease }) => (
  <div className="center controller">
    <div id={id}>{name}</div>
    <div className="center center-row">
      <FontAwesomeIcon icon="chevron-circle-up" className="icon" onClick={onIncrease}/>
      {value}
      <FontAwesomeIcon icon="chevron-circle-down" className="icon" onClick={onDecrease}/>
    </div>
  </div>
)

const Clock = ({ time }) => (
  <div id="clock" className="center">
    <div id="timer-label">Session</div>
    <div>{time}</div>
  </div>
)

const Buttons = ({ isRunning, togglePlay, reset }) => (
  <div className="center center-row controller">
    <FontAwesomeIcon icon={isRunning ? "pause-circle" : "play-circle"} className="icon" onClick={togglePlay}/>
    <FontAwesomeIcon icon="sync-alt" className="icon" onClick={reset}/>
  </div>
)

