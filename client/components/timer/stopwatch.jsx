import React from 'react';
import TimerModal from './timer-modal';

// component contains workout stopwatch to time workout and rest periods
class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 'Workout', // valid values: "Workout", "Rest"
      view: 'stopwatch', // valid values: "stopwatch", "timer-modal"
      workoutMin: '00', // input type: number. default value is a string
      workoutSec: '00', // input type: number. default value is a string
      restMin: '00', // input type: number. default value is a string
      restSec: '00', // input type: number. default value is a string
      isClicked: 'Set Time' // valid values: "Set Time", "Reset"
    };
    this.countdown = this.countdown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.workoutCountdown = this.workoutCountdown.bind(this);
    this.restCountdown = this.restCountdown.bind(this);
    this.workoutInverval = null;
    this.restInterval = null;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isClicked = this.isClicked.bind(this);
  }

  // handles clicking on "Set Time" button and closing the timer modal
  handleClick() {
    if (this.state.view === 'stopwatch') {
      if (this.state.isClicked === 'Set Time') {
        this.setState({
          view: 'timer-modal'
        });

        // if user is trying to reset the timer, will reset state to default
        // and clear the timer intervals
      } else {
        this.setState({
          timer: 'Workout',
          view: 'stopwatch',
          workoutMin: '00',
          workoutSec: '00',
          restMin: '00',
          restSec: '00',
          isClicked: 'Set Time'
        });
        clearInterval(this.workoutInverval);
        clearInterval(this.restInterval);
        this.workoutInverval = null;
        this.restInterval = null;
      }
    } else {
      this.setState({
        view: 'stopwatch'
      });
    }
  }

  // sets the time values in state on user input
  onChange(event) {
    const name = event.target.name;
    const value = parseInt(event.target.value);
    this.setState({ [name]: value });
  }

  // if user sets the time, changes "Set Time" button to "Reset". otherwise, changes
  // "Reset" button to "Set Time"
  isClicked() {
    if (this.state.isClicked === 'Set Time') {
      this.setState({ isClicked: 'Reset' });
    } else {
      this.setState({
        isClicked: 'Set Time'
      });
    }
  }

  // sets countdown timers to values in input boxes on submission
  handleSubmit(event) {
    event.preventDefault();
    this.countdown(this.state.workoutMin, this.state.workoutSec, this.state.restMin, this.state.restSec);
  }

  // sets workout countdown interval, clearing it if the time reaches zero and resetting
  // state to original workout time, then calls restCountdown
  workoutCountdown(workoutMin, workoutSec, restMin, restSec) {
    let newSec = workoutSec;
    let newMin = workoutMin;
    this.workoutInverval = setInterval(() => {
      this.setState(({ workoutSec: parseInt(newSec) - 1 }), state => {
        newSec--;
        if (this.state.workoutMin > 0 && newSec < 0) {
          newSec = 59;
          this.setState({
            workoutMin: parseInt(newMin) - 1,
            workoutSec: newSec
          });
          newMin--;
        } else if (this.state.workoutSec < 10 && this.state.workoutSec >= 0) {
          this.setState({ workoutSec: '0' + parseInt(this.state.workoutSec) });
        }
        if ((this.state.workoutSec < 0 || this.state.workoutSec === '00') && (this.state.workoutMin === '00' || this.state.workoutMin <= 0)) {
          clearInterval(this.workoutInverval);
          this.setState({
            workoutMin: workoutMin,
            workoutSec: workoutSec,
            timer: 'Rest'
          });
          this.restCountdown(workoutMin, workoutSec, restMin, restSec);
        }
      });
    }, 1000);
  }

  // sets rest countdown interval, clearing it if the time reaches zero and resetting state
  // to original rest time, then calls workoutCountdown
  restCountdown(workoutMin, workoutSec, restMin, restSec) {
    let newMin = restMin;
    let newSec = restSec;
    this.restInterval = setInterval(() => {
      this.setState(({ restSec: parseInt(newSec) - 1 }), state => {
        newSec--;
        if (this.state.restMin > 0 && this.state.restSec < 0) {
          newSec = 59;
          this.setState({
            restMin: parseInt(newMin) - 1,
            restSec: newSec
          });
          newMin--;
        } else if (this.state.restSec < 10 && this.state.restSec >= 0) {
          this.setState({ restSec: '0' + parseInt(this.state.restSec) });
        }
        if ((this.state.restSec < 0 || this.state.restSec === '00') && (this.state.restMin === '00' || this.state.restMin <= 0)) {
          clearInterval(this.restInterval);
          this.setState({
            restMin: restMin,
            restSec: restSec,
            timer: 'Workout'
          });
          this.workoutCountdown(workoutMin, workoutSec, restMin, restSec);
        }
      });
    }, 1000);
  }

  // starts the countdown and sets the view to stopwatch
  countdown(workoutMin, workoutSec, restMin, restSec) {
    this.workoutCountdown(workoutMin, workoutSec, restMin, restSec);
    this.handleClick();
  }

  // method to format time in state and return it for use in the render method
  formatTime(timeInput) {
    let formattedTime = '';
    const time = `${timeInput}`;
    if (time.length < 2) {
      formattedTime = `0${time}`;
    } else {
      formattedTime = time;
    }
    if (!formattedTime) {
      return '00';
    } else {
      return formattedTime;
    }
  }

  render() {
    if (this.state.view === 'timer-modal') {
      return (
        <TimerModal isClicked={this.isClicked}
          handleSubmit={this.handleSubmit}
          countdown={this.countdown}
          onChange={this.onChange}
          handleClick={this.handleClick}
          values={this.state} />
      );
    }

    if (this.state.timer === 'Rest') {
      if (this.state.isClicked === 'Set Time') {
        return (
          <div className="clock-container">
            <div className="clock">
              <h1>{this.formatTime(this.state.restMin)}:{this.formatTime(this.state.restSec)}</h1>
            </div>
            <h1 className="timer-state">{this.state.timer}</h1>
            <button onClick={this.handleClick} className="btn btn-success mt-5 pr-5 pl-5 set-time">{this.state.isClicked}</button>
          </div>
        );

      } else {
        return (
          <div className="clock-container">
            <div className="clock">
              <h1>{this.formatTime(this.state.restMin)}:{this.formatTime(this.state.restSec)}</h1>
            </div>
            <h1 className="timer-state">{this.state.timer}</h1>
            <button onClick={this.handleClick} className="btn btn-danger mt-5 pr-5 pl-5 set-time">{this.state.isClicked}</button>
          </div>
        );
      }

    } else {
      if (this.state.isClicked === 'Set Time') {
        return (
          <div className="clock-container">
            <div className="clock">
              <h1>{this.formatTime(this.state.workoutMin)}:{this.formatTime(this.state.workoutSec)}</h1>
            </div>
            <h1 className="timer-state">{this.state.timer}</h1>
            <button onClick={this.handleClick} className="btn btn-success mt-5 pr-5 pl-5 set-time">{this.state.isClicked}</button>
          </div>
        );

      } else {
        return (
          <div className="clock-container">
            <div className="clock">
              <h1>{this.formatTime(this.state.workoutMin)}:{this.formatTime(this.state.workoutSec)}</h1>
            </div>
            <h1 className="timer-state">{this.state.timer}</h1>
            <button onClick={this.handleClick} className="btn btn-danger mt-5 pr-5 pl-5 set-time">{this.state.isClicked}</button>
          </div>
        );
      }
    }
  }
}

export default Stopwatch;
