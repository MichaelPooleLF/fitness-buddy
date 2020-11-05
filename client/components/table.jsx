import React from 'react';
import TableRow from './table-row';

function Table(props) {

  const tableData = props.exercises.map(item => {
    return (
      <TableRow
        key={item.customExerciseId}
        name={item.exercise}
        description={item.description}
        setView={props.setView}
        handleDeleteClick={props.handleDeleteClick}
        handleUpdateClick={props.handleUpdateClick}
        id={item.customExerciseId}
      />
    );
  });

  const numberOfExercises = tableData.length;

  if (numberOfExercises === 0) {
    return (
      <h3 className="text-center mt-5">No exercises added.</h3>
    );
  }

  return (
    <div className="overflow-auto container table-container">
      <table className="main-table">
        <tbody>
          {tableData}
        </tbody>
      </table>
    </div>
  );

}

export default Table;
