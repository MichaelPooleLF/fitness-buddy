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
      reps: 0,
      toggleUserTime: true,
      paused: false,
      timeInterval: undefined
    };
    this.setComponentView = this.setComponentView.bind(this);
    this.calculateTime = this.calculateTime.bind(this);
    this.startTime = this.startTime.bind(this);
  }

  startTime(event, userTime) {
    event.preventDefault();
    const form = event.target;
    const formIsValid = form.checkValidity();

    if (formIsValid) {
      this.setState({
        time: userTime.workout,
        userTime: userTime,
        timeInterval: setInterval(this.calculateTime, 1000)
      }, this.setComponentView);
    }
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
          toggleUserTime: !this.state.toggleUserTime,
          reps: this.state.reps + 1
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

  setComponentView() {
    if (this.props.componentView === 'timer') {
      this.props.changeAppView('timer', 'timer-modal');
    } else if (this.props.componentView === 'timer-modal') {
      this.props.changeAppView('timer', 'set');
    } else {
      this.props.changeAppView('timer');
    }
  }

  pauseTime() {
    this.setState({
      paused: true,
      timeInterval: clearInterval(this.state.timeInterval)
    });
  }

  resumeTime() {
    this.setState({
      paused: false,
      timeInterval: setInterval(this.calculateTime, 1000)
    });
  }

  componentWillUnmount() {
    this.resetPage();
  }

  resetPage() {
    this.setState({
      time: '0:0',
      userTime: {
        workout: '0:0',
        rest: '0:0'
      },
      reps: 0,
      toggleUserTime: true,
      paused: false,
      timeInterval: clearInterval(this.state.timeInterval)
    }, this.setComponentView);
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
    if (this.props.componentView === 'timer') {
      return (
        <>
          <div className="container">
            <Clock time={this.formatTime(this.state.time)}/>
            <div className='row justify-content-center mt-5'>
              <button className={'btn btn-success set-time'}
                onClick={this.setComponentView} >
                Set Time
              </button>
            </div>
          </div>
        </>
      );
    } else if (this.props.componentView === 'set') {
      return (
        <>
          <div className="container">
            <Clock time={this.formatTime(this.state.time)}/>
            <h1 className="text-center mt-3 mb-0">{this.state.toggleUserTime ? 'Workout!' : 'Rest...'}</h1>
            <h2 className="text-center my-3">{`Reps: ${this.state.reps}`}</h2>
            <div className='row justify-content-center timer-buttons'>
              <i className="fas fa-redo-alt timer-icon blue reset mr-5"
                onClick={() => this.resetPage()}></i>
              <i className={`${this.state.paused ? 'fas fa-play green' : 'fas fa-pause red'} timer-icon`}
                onClick={this.state.paused ? () => this.resumeTime() : () => this.pauseTime()} >
              </i>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <TimerModal startTime={this.startTime}
            changeAppView={this.props.changeAppView}/>
          <h1 className="text-center">{this.state.toggleUserTime ? 'Workout' : 'Rest'}</h1>
          <Clock time={this.formatTime(this.state.time)}/>
          <div className='d-flex justify-content-center'>
            <button className={'btn btn-success set-time'}>
              Set Time
            </button>
          </div>
        </>
      );
    }
  }
}

export default Timer;
