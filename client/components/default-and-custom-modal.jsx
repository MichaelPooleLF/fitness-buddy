import React from 'react';

function DefaultAndCustomModal(props) {
  return (
    <div className="container">
      <div className="card">
        <div className="card-header text-center">Add Exercise</div>
        <div className="card-body">
          <p className="card-text text-center">Choose Default or Custom</p>
          <a href="#" className="btn btn-success btn-block" onClick={() => props.setView('default')}>Default</a>
          <a href="#" className="btn btn-success btn-block" onClick={() => props.setView('custom')}>Custom</a>
        </div>
      </div>
    </div>
  );
}

export default DefaultAndCustomModal;
