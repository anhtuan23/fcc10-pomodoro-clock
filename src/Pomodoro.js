import React, { Component } from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleUp, faChevronCircleDown, faClock, faPlayCircle, faPauseCircle, faSyncAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faChevronCircleUp, faChevronCircleDown, faClock, faPlayCircle, faPauseCircle, faSyncAlt);

class Pomodoro extends Component {
  render() {
    return (
      <div className="wrappper center">
        <div className="center center-row">
          <FontAwesomeIcon icon="clock" className="icon" id="app-icon" />
          <h1>Pomodoro Clock</h1>
        </div>
        <div className="center center-row">
          <Controller name="Break Length" id="break-label" value="5" />
          <Controller name="Session Length" id="session-label" value="25" />
        </div>
        <Clock time="25" />
        <Buttons isRunning={true} />
      </div>
    );
  }
}

const Controller = ({ name, id, value, onIncrease, onDecrease }) => (
  <div className="center controller">
    <div id={id}>{name}</div>
    <div className="center center-row">
      <FontAwesomeIcon icon="chevron-circle-up" className="icon" />
      {value}
      <FontAwesomeIcon icon="chevron-circle-down" className="icon" />
    </div>
  </div>
)

const Clock = ({ time }) => (
  <div id="clock" className="center">
    <div id="timer-label">Session</div>
    <div>{time}</div>
  </div>
)

const Buttons = ({ isRunning }) => (
  <div className="center center-row controller">
    <FontAwesomeIcon icon={isRunning ? "pause-circle" : "play-circle"} className="icon" />
    <FontAwesomeIcon icon="sync-alt" className="icon" />
  </div>
)

export default Pomodoro;
