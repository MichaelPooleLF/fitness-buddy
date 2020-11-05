import React from 'react';

function TimerModal(props) {
  return (
    <div className="fitness-modal-background">
      <div className="fitness-modal-content">
        <form onSubmit={props.handleSubmit}>
          <i className="fas fa-times close-modal" onClick={props.handleClick}></i>
          <h3 className="text-center">Workout Time</h3>
          <div className="form-row justify-content-center align-items-center">
            <div className="col-5 d-flex justify-content-end">
              <label className="sr-only" htmlFor="workout-time-minutes"></label>
              <input className="time-input" onChange={props.onChange} value={props.values.workoutMin} type="number" id="workout-time-minutes" name="workoutMin" placeholder="00" min="0" max="59" />
            </div>
            <p className="d-inline time-seperator">:</p>
            <div className="col-5">
              <label className="sr-only" htmlFor="workout-time-seconds"></label>
              <input className="time-input" onChange={props.onChange} value={props.values.workoutSec} type="number" id="workout-time-seconds" name="workoutSec" placeholder="00" min="0" max="59" />
            </div>
          </div>
          <h3 className="text-center mt-5">Rest Time</h3>
          <div className="form-row justify-content-center align-items-center ">
            <div className="col-5 d-flex justify-content-end">
              <label className="sr-only" htmlFor="rest-time-minutes"></label>
              <input className="time-input" onChange={props.onChange} value={props.values.restMin} type="number" id="rest-time-minutes" name="restMin" placeholder="00" min="0" max="59" />
            </div>
            <p className="d-inline time-seperator">:</p>
            <div className="col-5">
              <label className="sr-only" htmlFor="rest-time-seconds"></label>
              <input className="time-input" onChange={props.onChange} value={props.values.restSec} type="number" id="rest-time-seconds" name="restSec" placeholder="00" min="0" max="59" />
            </div>
          </div>
          <div className="form-row justify-content-center mt-5">
            <button onClick={props.isClicked} className="btn btn-primary set-time">Set Time</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TimerModal;
