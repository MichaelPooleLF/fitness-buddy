import React from 'react';

function TimerModal(props) {
  return (
    <div className="timer-modal-background">
      <div className="timer-modal-content">

        {/* start timer modal form */}
        <form className="my-4">

          {/* close button */}
          <i className="fas fa-times close-modal cursor-pointer"></i>

          {/* start workout time section */}
          <fieldset className="form-group">
            <div className="form-row justify-content-center">
              <legend className="col-form-label col-12 text-center legend-text">Workout Time</legend>
              <div className="form-group col-4 d-flex justify-content-center">
                <label htmlFor="workout-minutes" className="sr-only">Workout Minutes</label>
                <input className="time-input" type="number" id="workout-minutes" name="workout-minutes" defaultValue="00" min="0" max="59"/>
              </div>
              <div className="form-group col-1 d-flex justify-content-center">
                <p className="time-seperator">:</p>
              </div>
              <div className="form-group col-4 d-flex justify-content-center">
                <label htmlFor="workout-minutes" className="sr-only">Workout Seconds</label>
                <input className="time-input" type="number" id="workout-minutes" name="workout-minutes" defaultValue="00" min="0" max="59" />
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
                <input className="time-input" type="number" id="rest-minutes" name="rest-minutes" defaultValue="00" min="0" max="59" />
              </div>
              <div className="form-group col-1 d-flex justify-content-center">
                <p className="time-seperator">:</p>
              </div>
              <div className="form-group col-4 d-flex justify-content-center">
                <label htmlFor="rest-Seconds" className="sr-only">Rest Seconds</label>
                <input className="time-input" type="number" id="rest-Seconds" name="rest-Seconds" defaultValue="00" min="0" max="59" />
              </div>
            </div>
          </fieldset>
          {/* end rest time section */}

          {/* submit button */}
          <div className="form-group mt-5">
            <div className="form-row justify-content-center">
              <button className="btn btn-primary set-time">Set Time</button>
            </div>
          </div>

        </form>
        {/* end timer modal form */}

      </div>
    </div>
  );
}

export default TimerModal;
