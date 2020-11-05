import React from 'react';
import TimerModal from './timer-modal';

class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 'Workout',
      view: 'stopwatch',
      workoutMin: '00',
      workoutSec: '00',
      restMin: '00',
      restSec: '00',
      isClicked: 'Set Time'
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

  handleClick() {
    if (this.state.view === 'stopwatch') {
      if (this.state.isClicked === 'Set Time') {
        this.setState({
          view: 'timer-modal'
        });
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

  onChange(event) {
    const name = event.target.name;
    const value = parseInt(event.target.value);
    this.setState({ [name]: value });
  }

  isClicked() {
    if (this.state.isClicked === 'Set Time') {
      this.setState({ isClicked: 'Reset' });
    } else {
      this.setState({
        isClicked: 'Set Time'
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (isNaN(this.state.workoutMin)) {
      return null;
    }
    if (isNaN(this.state.workoutSec)) {
      return null;
    }
    if (isNaN(this.state.restMin)) {
      return null;
    }
    if (isNaN(this.state.restSec)) {
      return null;
    }
    this.countdown(this.state.workoutMin, this.state.workoutSec, this.state.restMin, this.state.restSec);
  }

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

  countdown(workoutMin, workoutSec, restMin, restSec) {
    if (!workoutSec) {
      return null;
    }
    this.workoutCountdown(workoutMin, workoutSec, restMin, restSec);
    this.handleClick();
  }

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
        <>
          <TimerModal isClicked={this.isClicked} handleSubmit={this.handleSubmit} countdown={this.countdown} onChange={this.onChange} handleClick={this.handleClick} values={this.state} />
        </>
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
