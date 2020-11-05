import React from 'react';

function RecommendedCalories(props) {
  if (props.calories) {
    return (
      <div className="bg-color-blue border-top py-1">
        <div className="container recommended-cal">
          <p className="mb-0 white">{`Recommended Daily Calories: ${props.calories}`}</p>
          <i className="fas fa-redo cursor-pointer" onClick={props.resetCalories}></i>
        </div>
      </div>
    );
  } else {
    return (
      null
    );
  }
}

export default RecommendedCalories;
