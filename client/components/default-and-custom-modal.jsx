import React from 'react';

function DefaultAndCustomModal(props) {
  return (
    <div className="container stretch">
      <div className="row">
        <button className="btn btn-outline-primary choose-screen-button"
          onClick={() => props.setView('default')}>
          Add a Pre-Made Exercise
        </button>
      </div>
      <div className="row mt-5">
        <button className="btn btn-outline-primary choose-screen-button"
          onClick={() => props.setView('custom')}>
          Create and Add an Exercise
        </button>
      </div>
    </div>
  );
}

export default DefaultAndCustomModal;
