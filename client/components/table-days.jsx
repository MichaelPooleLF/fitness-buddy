import React from 'react';

function TableDays(props) {

  return (
    <div className="text-center">
      <div className="btn-group btn-group-sm mt-2 mb-2 d-flex">
        <button type="button" className="btn button day-button" id="1" onClick={props.handleClick}>Sun</button>
        <button type="button" className="btn button day-button" id="2" onClick={props.handleClick}>Mon</button>
        <button type="button" className="btn button day-button" id="3" onClick={props.handleClick}>Tue</button>
        <button type="button" className="btn button day-button" id="4" onClick={props.handleClick}>Wed</button>
        <button type="button" className="btn button day-button" id="5" onClick={props.handleClick}>Thu</button>
        <button type="button" className="btn button day-button" id="6" onClick={props.handleClick}>Fri</button>
        <button type="button" className="btn button day-button" id="7" onClick={props.handleClick}>Sat</button>
      </div>
    </div>
  );
}

export default TableDays;
