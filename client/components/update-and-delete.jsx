import React from 'react';

function UpdateAndDelete(props) {

  return (
    <td className="update-and-delete">
      <button
        type="button"
        id={props.id}
        className="btn btn-outline-primary btn-sm ml-1"
        onClick={props.handleUpdateClick}
      >Update</button>
      <button
        type="button"
        className="btn btn-outline-danger btn-sm ml-1"
        onClick={props.handleDeleteClick}
        id={props.id}
      >Delete</button>
    </td>
  );
}

export default UpdateAndDelete;
