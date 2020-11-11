import React from 'react';
import TableRow from './table-row';

function Table(props) {

  // returns an array of table rows corresponding to the exercises for the shown day
  const tableData = props.exercises.map(item => {
    return (
      <TableRow
        key={item.customExerciseId}
        name={item.exercise}
        description={item.description}
        handleDeleteClick={props.handleDeleteClick}
        handleUpdateClick={props.handleUpdateClick}
        id={item.customExerciseId}
      />
    );
  });

  const numberOfExercises = tableData.length;

  // if there are no exercises for the day, returns a message alerting user
  if (numberOfExercises === 0) {
    return (
      <h3 className="text-center mt-5">No exercises added.</h3>
    );
  }

  // otherwise, returns table populated with exercises for the day
  return (
    <div className="container table-container">
      <table className="main-table">
        <tbody>
          {tableData}
        </tbody>
      </table>
    </div>
  );

}

export default Table;
