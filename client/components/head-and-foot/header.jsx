import React from 'react';

// component containing header
function Header() {
  return (
    <div className="container responsive-centering app-header border-bottom py-3 max-w-100">
      <i className="fas fa-dumbbell size-icon white"></i>
      <h3 className="ml-2 mb-0 white">Fitness Buddy</h3>
    </div>
  );
}

export default Header;
