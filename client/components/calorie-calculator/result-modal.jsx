import React from 'react';

function ResultModal(props) {

  // this component returns a modal that displays the calculated daily calorie needs
  return (
    <div className="calorie-modal-container">
      <div className="calorie-modal-contents">
        <div>
          <h3>Your total daily calorie needs are:</h3>
          <h1>{props.calories} Calories</h1>
          <div className="button-container">
            <button className="btn btn-outline-primary mt-3" onClick={props.returnToCalculator}>Return to Calculator</button>
            <button className="btn btn-outline-primary mt-3" onClick={props.returnToPlanner}>Return to Planner</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultModal;
