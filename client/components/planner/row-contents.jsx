import React from 'react';

// table data that contains update and delete buttons
function UpdateAndDelete(props) {

  return (
    <>
      <p className="mb-0">
        {props.name}
      </p>
      <div className="update-and-delete cursor-pointer" onClick={props.showDescription}>
        <i className="fas fa-edit blue size-icon-sm"
          exerciseid={props.id}
          onClick={props.handleUpdateClick}>
        </i>
        <i className="far fa-trash-alt red size-icon-sm mx-2"
          exerciseid={props.id}
          onClick={props.handleDeleteClick}>
        </i>
      </div>
    </>
  );
}

export default UpdateAndDelete;
