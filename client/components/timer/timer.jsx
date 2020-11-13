import React from 'react';
import Clock from './clock';
import TimerModal from './timer-modal';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: '0:0',
      userTime: {
        workout: '0:0',
        rest: '0:0'
      },
      toggleUserTime: true,
      timeInterval: undefined,
      timerButton: {
        text: 'Set Time',
        color: 'btn-success'
      }
    };
    this.setComponentView = this.setComponentView.bind(this);
    this.calculateTime = this.calculateTime.bind(this);
    this.startTime = this.startTime.bind(this);
  }

  setComponentView() {
    if (this.props.componentView === 'stopwatch') {
      this.props.changeAppView('stopwatch', 'timer-modal');
    } else {
      this.props.changeAppView('stopwatch');
    }
  }

  pauseTime() {
    this.setState({
      timeInterval: clearInterval(this.state.timeInterval),
      timerButton: {
        text: 'Resume',
        color: 'btn-success'
      }
    });
  }

  resumeTime() {
    this.setState({
      timeInterval: setInterval(this.calculateTime, 1000),
      timerButton: {
        text: 'Pause',
        color: 'btn-danger'
      }
    });
  }

  calculateTime() {
    const timeArray = this.state.time.split(':');
    let minutes = parseInt(timeArray[0], 10);
    let seconds = parseInt(timeArray[1], 10);

    if (minutes === 0 && seconds === 0) {
      if (this.state.toggleUserTime) {
        this.setState({
          time: this.state.userTime.rest,
          toggleUserTime: !this.state.toggleUserTime
        });
        return;
      } else {
        this.setState({
          time: this.state.userTime.workout,
          toggleUserTime: !this.state.toggleUserTime
        });
        return;
      }
    }

    if (seconds === 0) {
      seconds = 59;
      minutes--;
    } else {
      seconds--;
    }

    this.setState({
      time: `${minutes}:${seconds}`
    });
  }

  startTime(event, userTime) {
    event.preventDefault();
    const form = event.target;
    const formIsValid = form.checkValidity();

    if (formIsValid) {
      this.setState({
        time: userTime.workout,
        userTime: userTime,
        timeInterval: setInterval(this.calculateTime, 1000),
        timerButton: {
          text: 'Pause',
          color: 'btn-danger'
        }
      }, this.setComponentView);
    }
  }

  formatTime(time) {
    const timeArray = time.split(':');
    let minutes = parseInt(timeArray[0], 10);
    let seconds = parseInt(timeArray[1], 10);

    if (seconds < 10) {
      seconds = '0' + seconds.toString();
    } else {
      seconds = seconds.toString();
    }

    if (minutes < 10) {
      minutes = '0' + minutes.toString();
    } else {
      minutes = minutes.toString();
    }

    return `${minutes}:${seconds}`;
  }

  render() {
    if (this.props.componentView === 'stopwatch') {
      return (
        <>
          <h1 className="text-center">{this.state.toggleUserTime ? 'Workout' : 'Rest'}</h1>
          <Clock time={this.formatTime(this.state.time)}/>
          <div className='d-flex justify-content-center'>
            <button className={`btn ${this.state.timerButton.color} set-time`}
              onClick={() => {
                if (this.state.timerButton.text === 'Pause') {
                  this.pauseTime();
                } else if (this.state.timerButton.text === 'Resume') {
                  this.resumeTime();
                } else {
                  this.setComponentView();
                }
              }} >
              {this.state.timerButton.text}
            </button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <TimerModal startTime={this.startTime}
            exitModal={this.setComponentView}/>
          <h1 className="text-center">{this.state.toggleUserTime ? 'Workout' : 'Rest'}</h1>
          <Clock time={this.formatTime(this.state.time)}/>
          <div className='d-flex justify-content-center'>
            <button className={`btn ${this.state.timerButton.color} set-time`}>
              {this.state.timerButton.text}
            </button>
          </div>
        </>
      );
    }
  }
}

export default Timer;
