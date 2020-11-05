import React from 'react';

function RecommendedCalories(props) {
  if (props.calories) {
    return (
      <div className="header navbar navbar-brand justify-content-between border-top">
        <p className="mb-0">{`Recommended Daily Calories: ${props.calories}`}</p>
        <i className="fas fa-redo" onClick={props.resetCalories}></i>
      </div>
    );
  } else {
    return (
      <div className="invisible header navbar navbar-brand justify-content-between border-top">
        <p className="mb-0">{`Recommended Daily Calories: ${props.calories}`}</p>
      </div>
    );
  }
}

export default RecommendedCalories;
