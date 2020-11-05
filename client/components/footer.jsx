import React from 'react';

function Footer(props) {
  return (
    <div className="footer">
      <div className="container responsive-flex">
        <i className="fas fa-calendar-alt size-icon cursor-pointer"
          onClick={() => { props.setView('table'); }}>
        </i>
        <i className="fas fa-apple-alt size-icon cursor-pointer"
          onClick={() => { props.setView('calorie'); }}>
        </i>
        <i className="fas fa-clock size-icon cursor-pointer"
          onClick={() => { props.setView('stopwatch'); }}>
        </i>
        <i className="fas fa-plus size-icon cursor-pointer green"
          onClick={() => props.setView('choose')}>
        </i>
      </div>
    </div>
  );
}

export default Footer;
