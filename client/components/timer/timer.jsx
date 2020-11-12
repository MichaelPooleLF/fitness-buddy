import React from 'react';
import Clock from './clock';
import TimerModal from './timer-modal';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: '00:00',
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

  calculateTime() {
    const timeArray = this.state.time.split(':');
    let minutes = parseInt(timeArray[0], 10);
    let seconds = parseInt(timeArray[1], 10);

    if (seconds === 0) {
      seconds = 59;
      minutes--;
    } else {
      seconds--;
    }

    if (minutes === 0 && seconds === 0) {
      this.setState({
        timeInterval: clearInterval(this.state.timeInterval),
        time: '00:00',
        timerButton: {
          text: 'Set Time',
          color: 'btn-success'
        }
      });
      return;
    }

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

    this.setState({
      time: `${minutes}:${seconds}`
    });
  }

  startTime() {
    this.setState({
      timeInterval: setInterval(this.calculateTime, 1000),
      timerButton: {
        text: 'Pause',
        color: 'btn-danger'
      }
    });
  }

  render() {
    if (this.props.componentView === 'stopwatch') {
      return (
        <>
          <Clock time={this.state.time}/>
          <div className='d-flex justify-content-center'>
            <button onClick={this.setComponentView} className={`btn ${this.state.timerButton.color} set-time`}>{this.state.timerButton.text}</button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <TimerModal />
          <Clock time={this.state.time}/>
          <div className='d-flex justify-content-center'>
            <button onClick={this.setComponentView} className={`btn ${this.state.timerButton.color} set-time`}>{this.state.timerButton.text}</button>
          </div>
        </>
      );
    }
  }
}

export default Timer;
