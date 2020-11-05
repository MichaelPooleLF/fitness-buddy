import React from 'react';
import TableRow from './table-row';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.handleClick = this.handleClick.bind(this);
  }

  // handleClick() {
  //   this.props.setView('choose');
  // }

  render() {
    const tableData = this.props.exercises.map(item => {
      return (
        <TableRow
          key={item.customExerciseId}
          name={item.exercise}
          description={item.description}
          setView={this.props.setView}
          handleDeleteClick={this.props.handleDeleteClick}
          handleUpdateClick={this.props.handleUpdateClick}
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

}

export default Table;
