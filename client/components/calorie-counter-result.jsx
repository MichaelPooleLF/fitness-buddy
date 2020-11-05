import React from 'react';
import Header from './header';

function CalorieCounterResult(props) {

  return (
    <div>
      <Header />
      <div
        className="container text-center calorie-modal"
      >
        <div className="calorie-m-div">
          <h1>Calories Calculation</h1>
          <p>Gender: {props.values.genderselect}</p>
          <p>Age: {props.values.age}</p>
          <p>Weight: {props.values.weight}</p>
          <p>Height: {props.values.height} </p>
          <p>Activity Level: {props.values.activitylevel}</p>
        </div>
        <div>
          <h3>Your total daily calorie needs are:</h3>
          <h1>{props.calories} Calories</h1>
          <button className="btn btn-success calorie-return" onClick={props.handleClick}>Return</button>
        </div>
      </div>
    </div>
  );
}

export default CalorieCounterResult;
