import React from 'react';

// component contains app footer with icons to change to different pages of the app
function Footer(props) {

  const icons = [
    { image: 'fas fa-calendar-alt', path: 'table', color: 'white', active: '' },
    { image: 'fas fa-apple-alt', path: 'calorie', color: 'white', active: '' },
    { image: 'fas fa-clock', path: 'timer', color: 'white', active: '' },
    { image: 'fas fa-plus', path: 'add-home', color: 'green', active: '' }
  ];

  icons.forEach(icon => {
    if (icon.path === props.activeIcon) {
      icon.active = 'active-icon';
      if (icon.color === 'white') { // if active icon is for add-exercise icon, this keeps icon color green
        icon.color = 'orange';
      }
    }
  });

  const iconElementArray = icons.map(icon => {
    return (
      <i className={`${icon.image} size-icon cursor-pointer icon-hover ${icon.color} ${icon.active}`}
        onClick={() => { props.changeAppView(icon.path); }}
        key={`${icon.path}`}>
      </i>
    );
  });

  return (
    <div className="footer">
      <div className="container footer-container responsive-x-padding max-w-100">
        {iconElementArray}
      </div>
    </div>
  );
}

export default Footer;
