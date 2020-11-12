import React from 'react';

// table data that contains update and delete buttons
function UpdateAndDelete(props) {

  return (
    <td className="update-and-delete cursor-pointer" onClick={props.showDescription}>
      <button
        type="button"
        exerciseid={props.id} // attribute is lowercase because it is a custom attribute
        className="btn btn-outline-primary btn-sm ml-1"
        onClick={props.handleUpdateClick}>
          Update
      </button>

      <button
        type="button"
        exerciseid={props.id} // attribute is lowercase because it is a custom attribute
        className="btn btn-outline-danger btn-sm ml-1"
        onClick={props.handleDeleteClick}>
          Delete
      </button>
    </td>
  );
}

export default UpdateAndDelete;
