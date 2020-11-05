import React from 'react';

function Footer(props) {
  return (
    <div className="navbar footer">
      <a className="navbar-brand" onClick={() => {
        props.setView('table');
      }}>
        <i className="fas fa-calendar-alt fa-2x"></i>
      </a>
      <a className="navbar-brand" onClick={() => {
        props.setView('calorie');
      }} href="#">
        <i className="fas fa-apple-alt fa-2x"></i>
      </a>
      <a className="navbar-brand" onClick={() => {
        props.setView('stopwatch');
      }} >
        <i className="fas fa-clock fa-2x"></i>
      </a>
    </div>
  );
}

export default Footer;
