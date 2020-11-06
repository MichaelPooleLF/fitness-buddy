import React from 'react';

function RecommendedCalories(props) {
  if (props.calories) {
    return (
      <div className="container recommended-cal py-1">
        <p className="mb-0 white">{`Recommended Daily Calories: ${props.calories}`}</p>
        <i className="fas fa-redo cursor-pointer" onClick={props.resetCalories}></i>
      </div>
    );
  } else {
    return (
      null
    );
  }
}

export default RecommendedCalories;
