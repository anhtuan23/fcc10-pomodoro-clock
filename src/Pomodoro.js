import React, { Component } from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleUp, faChevronCircleDown, faClock, faPlayCircle, faPauseCircle, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { connect } from "react-redux";
import { increaseBreak, decreaseBreak, increaseSession, decreaseSession, reset, startCountDown } from "./actions";
import alarmSound from './alarm.mp3'

library.add(faChevronCircleUp, faChevronCircleDown, faClock, faPlayCircle, faPauseCircle, faSyncAlt);

class Pomodoro extends Component {
  render() {
    const { breakLength, sessionLength, timeLeft, isRunning, isInBreak, increaseBreak, decreaseBreak, increaseSession, decreaseSession, togglePlay, reset } = this.props;
    return (
      <div className="wrappper center" >
        <div className="center center-row">
          <FontAwesomeIcon icon="clock" className="icon" id="app-icon" />
          <h1>Pomodoro Clock</h1>
        </div>
        <div className="center center-row">
          <Controller type="break" value={breakLength} onIncrease={increaseBreak} onDecrease={decreaseBreak} />
          <Controller type="session" value={sessionLength} onIncrease={increaseSession} onDecrease={decreaseSession} />
        </div>
        <Clock time={timeLeft} isInBreak={isInBreak} />
        <Buttons isRunning={isRunning} togglePlay={togglePlay} reset={reset} />
      </div>
    );
  }
}

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

const Controller = ({ type, value, onIncrease, onDecrease }) => (
  <div className="center controller">
    <div id={type + "-label"}>{capitalizeFirstLetter(type) + " Length"}</div>
    <div className="center center-row">
      <div onClick={onIncrease} id={type + "-increment"}> {/* The test only works with click on div */}
        <FontAwesomeIcon icon="chevron-circle-up" className="icon" />
      </div>
      <div id={type + "-length"}>{value}</div>
      <div onClick={onDecrease} id={type + "-decrement"} >
        <FontAwesomeIcon icon="chevron-circle-down" className="icon" />
      </div>
    </div>
  </div>
)

const Clock = ({ time, isInBreak }) => {
  let minutes = Math.floor(time / 60);
  minutes = minutes >= 10 ? minutes : '0' + minutes;
  let seconds = time % 60;
  seconds = seconds >= 10 ? seconds : '0' + seconds;

  if (time === 0) {
    document.getElementById('beep').play();
  }

  return (
    <div id="clock" className="center">
      <div id="timer-label">{isInBreak ? "It's break time!" : "Session"}</div>
      <div id="time-left">{minutes}:{seconds}</div>
      <audio src={alarmSound} id="beep"></audio>
    </div>
  );
}

const Buttons = ({ isRunning, togglePlay, reset }) => {
  // if (time === 0) {
  //   document.getElementById('beep').play();
  // }
  function onReset() {
    const audio = document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0;
    reset()
  }

  return (
    <div className="center center-row controller">
      <div onClick={togglePlay} id="start_stop" >
        <FontAwesomeIcon icon={isRunning ? "pause-circle" : "play-circle"} className="icon" />
      </div>
      <div onClick={onReset} id="reset" >
        <FontAwesomeIcon icon="sync-alt" className="icon" />
      </div>
    </div>
  );
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}