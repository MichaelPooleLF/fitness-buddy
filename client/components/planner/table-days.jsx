import React from 'react';

// returns row of clickable days of the week. on click, will update table with clicked day's
// exercises
function TableDays(props) {

  const days = [
    { name: 'Sun', active: '' },
    { name: 'Mon', active: '' },
    { name: 'Tues', active: '' },
    { name: 'Wed', active: '' },
    { name: 'Thurs', active: '' },
    { name: 'Fri', active: '' },
    { name: 'Sat', active: '' }
  ];

  // mark active day in days array
  days.forEach((element, index) => {
    if (index + 1 === parseInt(props.activeDay)) {
      element.active = 'active';
    }
  });

  // creates an array of React elements, marking the active day in the className
  const tableDayElements = days.map((day, index) => {
    // returns element for Sunday
    if (index === 0) {
      return (
        <div className={`day col border-left-0 ${day.active}`} id={index + 1} key={`day ${index + 1}`} onClick={props.handleClick}>{day.name}</div>
      );
    }

    // returns element for Saturday
    if (index === 6) {
      return (
        <div className={`day col border-right-0 ${day.active}`} id={index + 1} key={`day ${index + 1}`} onClick={props.handleClick}>{day.name}</div>
      );
    }

    // returns elements for weekdays
    return (
      <div className={`day col ${day.active}`} id={index + 1} key={`day ${index + 1}`} onClick={props.handleClick}>{day.name}</div>
    );
  });

  return (
    <>
      <div className="clear"></div>
      <div className="container days-container max-w-99">
        <div className="row flex-nowrap">
          {tableDayElements}
        </div>
      </div>
      <div className="clear"></div>
    </>
  );
}

export default TableDays;
