import React from 'react';

// component contains app footer with icons to change to different pages of the app
function Footer(props) {
  return (
    <div className="footer">
      <div className="container footer-container responsive-x-padding">
        <i className="fas fa-calendar-alt size-icon cursor-pointer icon-hover"
          onClick={() => { props.setView('table'); }}>
        </i>
        <i className="fas fa-apple-alt size-icon cursor-pointer icon-hover"
          onClick={() => { props.setView('calorie'); }}>
        </i>
        <i className="fas fa-clock size-icon cursor-pointer icon-hover"
          onClick={() => { props.setView('stopwatch'); }}>
        </i>
        <i className="fas fa-plus size-icon cursor-pointer icon-hover green"
          onClick={() => props.setView('choose')}>
        </i>
      </div>
    </div>
  );
}

export default Footer;
