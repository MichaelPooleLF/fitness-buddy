import React, { useState } from 'react';

// return a bar showing recommended Calories if present in app state. otherwise, returns nothing
function RecommendedCalories(props) {

  const [hidden, toggleHidden] = useState(false);

  if (!hidden) {
    return (
      <div className="container recommended-cal py-1">
        <p className="mb-0 white">{`Recommended Daily Calories: ${props.calories}`}</p>
        <i className="fas fa-times cursor-pointer white" onClick={() => toggleHidden(!hidden)}></i>
      </div>
    );
  } else {
    return (
      null
    );
  }
}

export default RecommendedCalories;
