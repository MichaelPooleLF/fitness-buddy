import React, { useState } from 'react';

function TimerModal(props) {

  const [workoutMin, setWMin] = useState('0');
  const [workoutSec, setWSec] = useState('0');
  const [restMin, setRMin] = useState('0');
  const [restSec, setRSec] = useState('0');

  const userInput = {
    workout: `${workoutMin}:${workoutSec}`,
    rest: `${restMin}:${restSec}`
  };

  return (
    <div className="timer-modal-background" onClick={
      event => {
        if (event.target.className === 'timer-modal-background') {
          props.changeAppView('stopwatch');
        }
      }
    }>
      <div className="timer-modal-content">

        {/* start timer modal form */}
        <form className="my-4" onSubmit={event => props.startTime(event, userInput)} noValidate>

          {/* start workout time section */}
          <fieldset className="form-group">
            <div className="form-row justify-content-center">
              <legend className="col-form-label col-12 text-center legend-text">Workout Time</legend>
              <div className="form-group col-4 d-flex justify-content-center">
                <label htmlFor="workout-minutes" className="sr-only">Workout Minutes</label>
                <input className="time-input"
                  type="number" id="workout-minutes"
                  name="workout-minutes"
                  defaultValue="00" min="0" max="59"
                  onChange={event => {
                    const wMin = event.target.value;
                    (wMin ? setWMin(wMin) : setWMin('0'));
                  }}/>
              </div>
              <div className="form-group col-1 d-flex justify-content-center">
                <p className="time-seperator">:</p>
              </div>
              <div className="form-group col-4 d-flex justify-content-center">
                <label htmlFor="workout-seconds" className="sr-only">Workout Seconds</label>
                <input className="time-input"
                  type="number"
                  id="workout-seconds"
                  name="workout-seconds"
                  defaultValue="00" min="0" max="59"
                  required
                  onChange={event => {
                    const wSec = event.target.value;
                    (wSec ? setWSec(wSec) : setWSec('0'));
                  }}/>
              </div>
            </div>
          </fieldset>
          {/* end workout time section */}

          {/* start rest time section */}
          <fieldset className="form-group">
            <div className="form-row justify-content-center">
              <legend className="col-form-label col-12 text-center legend-text">Rest Time</legend>
              <div className="form-group col-4 d-flex justify-content-center">
                <label htmlFor="rest-minutes" className="sr-only">Rest Minutes</label>
                <input className="time-input"
                  type="number"
                  id="rest-minutes"
                  name="rest-minutes"
                  defaultValue="00" min="0" max="59"
                  onChange={event => {
                    const rMin = event.target.value;
                    (rMin ? setRMin(rMin) : setRMin('0'));
                  }}/>
              </div>
              <div className="form-group col-1 d-flex justify-content-center">
                <p className="time-seperator">:</p>
              </div>
              <div className="form-group col-4 d-flex justify-content-center">
                <label htmlFor="rest-Seconds" className="sr-only">Rest Seconds</label>
                <input className="time-input"
                  type="number"
                  id="rest-seconds"
                  name="rest-seconds"
                  defaultValue="00" min="0" max="59"
                  required
                  onChange={event => {
                    const rSec = event.target.value;
                    (rSec ? setRSec(rSec) : setRSec('0'));
                  }}/>
              </div>
            </div>
          </fieldset>
          {/* end rest time section */}

          {/* submit button */}
          <div className="form-group mt-5">
            <div className="form-row justify-content-center">
              <button className="btn btn-primary set-time">Workout!</button>
            </div>
          </div>

        </form>
        {/* end timer modal form */}

      </div>
    </div>
  );
}

export default TimerModal;
