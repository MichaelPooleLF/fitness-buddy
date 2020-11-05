import React from 'react';

function Header() {
  return (
    <div className="header">
      <nav className="navbar">
        <a className="navbar-brand" href="#">
          <i className="fas fa-dumbbell fa-2x d-inline-block align-top"></i>
          <h3 className="ml-4 mt-1">Fitness Buddy</h3>
        </a>
      </nav>
    </div>
  );
}

export default Header;
