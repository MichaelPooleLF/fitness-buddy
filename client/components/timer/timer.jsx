import React from 'react';
import Clock from './clock';
// import TimerModal from './timer-modal';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      componentView: props.componentView,
      time: '0:10',
      timeInterval: undefined,
      buttonText: 'Start'
    };
    this.setComponentView = this.setComponentView.bind(this);
    this.calculateTime = this.calculateTime.bind(this);
    this.startTime = this.startTime.bind(this);
  }

  setComponentView() {
    if (this.state.componentView === 'stopwatch') {
      this.setState({
        componentView: 'timer-modal'
      });
    } else {
      this.setState({
        componentView: 'stopwatch'
      });
    }
  }

  calculateTime() {
    const timeArray = this.state.time.split(':');
    let minutes = parseInt(timeArray[0], 10);
    let seconds = parseInt(timeArray[1], 10);

    if (minutes === 0 && seconds === 0) {
      this.setState({
        timeInterval: clearInterval(this.state.timeInterval),
        time: '00:00',
        buttonText: 'Start'
      });
      return;
    }

    if (seconds === 0) {
      seconds = 59;
      minutes--;
    } else {
      seconds--;
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
      buttonText: 'Stop'
    });
  }

  render() {
    return (
      <>
        <h1 onClick={this.setComponentView}>{this.state.componentView}</h1>
        <Clock />
        <p>{this.state.time}</p>
        <button className="btn btn-success"
          onClick={this.startTime}>{this.state.buttonText}</button>
      </>
    );
  }
}

export default Timer;
