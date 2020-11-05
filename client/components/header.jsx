import React from 'react';

function Header() {
  return (
    <nav className="bg-color-blue py-3">
      <div className="container d-flex align-items-center responsive-centering">
        <i className="fas fa-dumbbell size-icon"></i>
        <h3 className="ml-2 mb-0 white">Fitness Buddy</h3>
      </div>
    </nav>
  );
}

export default Header;
