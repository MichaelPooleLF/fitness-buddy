import React from 'react';

function TimerModal(props) {
  return (
    <div className="timer-modal-background">
      <div className="timer-modal-content">

        {/* start timer modal form */}
        <form className="my-3">

          {/* close button */}
          <i className="fas fa-times close-modal cursor-pointer"></i>

          {/* workout time section */}
          <h3 className="text-center">Workout Time</h3>
          <div className="form-row justify-content-center align-items-center">

            {/* workout minute input */}
            <div className="col-5 d-flex justify-content-end">
              <label className="sr-only" htmlFor="workout-time-minutes"></label>
              <input className="time-input" type="number" id="workout-time-minutes" name="workoutMin" placeholder="00" min="0" max="59" />
            </div>

            {/* separator */}
            <p className="d-inline time-seperator">:</p>

            {/* workout seconds input */}
            <div className="col-5">
              <label className="sr-only" htmlFor="workout-time-seconds"></label>
              <input className="time-input" type="number" id="workout-time-seconds" name="workoutSec" placeholder="00" min="0" max="59" />
            </div>
          </div>
          {/* end workout time section */}

          {/* rest time section */}
          <h3 className="text-center mt-5">Rest Time</h3>
          <div className="form-row justify-content-center align-items-center ">

            {/* rest minute input */}
            <div className="col-5 d-flex justify-content-end">
              <label className="sr-only" htmlFor="rest-time-minutes"></label>
              <input className="time-input" type="number" id="rest-time-minutes" name="restMin" placeholder="00" min="0" max="59" />
            </div>

            {/* separator */}
            <p className="d-inline time-seperator">:</p>

            {/* rest second input */}
            <div className="col-5">
              <label className="sr-only" htmlFor="rest-time-seconds"></label>
              <input className="time-input" type="number" id="rest-time-seconds" name="restSec" placeholder="00" min="0" max="59" />
            </div>
          </div>
          {/* end rest time section */}

          {/* submit button */}
          <div className="form-row justify-content-center mt-5">
            <button className="btn btn-primary set-time">Set Time</button>
          </div>

        </form>
        {/* end timer modal form */}

      </div>
    </div>
  );
}

export default TimerModal;
