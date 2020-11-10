import React, { useState } from 'react';
import UpdateAndDelete from './update-and-delete';

// returns a row of table data with or without description depending on clicked status
function TableRow(props) {
  const [clicked, setClicked] = useState(false);

  if (clicked === true) {
    // renders row with exercise name, update and delete buttons, and a dropdown with exercise description
    return (
      <>
        <tr className="border-bottom border-primary">
          <td onClick={() => setClicked(!clicked)} className="cursor-pointer">
            {props.name}
          </td>
          <UpdateAndDelete
            showDescription={event => {
              // if buttons are clicked, will not collapse exercise description
              if (event.target.tagName === 'TD') {
                setClicked(!clicked);
              }
            }}
            handleDeleteClick={props.handleDeleteClick}
            handleUpdateClick={props.handleUpdateClick}
            id={props.id} />
        </tr>
        <tr className="border-bottom border-primary">
          <td colSpan="2" className="py-2">{props.description}</td>
        </tr>
      </>

    );

    // just renders row with exercise name, update and delete buttons
  } else {
    return (
      <tr className="border-bottom">
        <td onClick={() => setClicked(!clicked)} className="cursor-pointer">
          {props.name}
        </td>
        <UpdateAndDelete
          showDescription={event => {
            // if buttons are clicked, will not render exercise description
            if (event.target.tagName === 'TD') {
              setClicked(!clicked);
            }
          }}
          handleDeleteClick={props.handleDeleteClick}
          handleUpdateClick={props.handleUpdateClick}
          id={props.id}
        />
      </tr>
    );
  }
}

export default TableRow;
