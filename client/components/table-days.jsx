import React from 'react';

function TableDays(props) {

  return (
    <>
      <div className="clear"></div>
      <div className="container days-container">
        <div className="row flex-no-wrap">
          <div className="day col border-left-0" id="1" onClick={props.handleClick}>Sun</div>
          <div className="day col" id="2" onClick={props.handleClick}>Mon</div>
          <div className="day col" id="3" onClick={props.handleClick}>Tues</div>
          <div className="day col" id="4" onClick={props.handleClick}>Wed</div>
          <div className="day col" id="5" onClick={props.handleClick}>Thurs</div>
          <div className="day col" id="6" onClick={props.handleClick}>Fri</div>
          <div className="day col border-right-0" id="7" onClick={props.handleClick}>Sat</div>
        </div>
      </div>
      <div className="clear"></div>
    </>
  );
}

export default TableDays;
