import React from 'react';

function Clock(props) {
  return (
    <div className="clock-container">
      <div className="clock">
        <h1>{props.time}</h1>
      </div>
    </div>
  );
}

export default Clock;
