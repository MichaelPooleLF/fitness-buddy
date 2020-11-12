import React, { useState } from 'react';
import RowContents from './row-contents';

// returns a row of table data with or without description depending on clicked status
function TableRow(props) {
  const [clicked, setClicked] = useState(false);

  function showDescription(event) {
    if (event.target.tagName !== 'I') {
      setClicked(!clicked);
    }
  }

  if (clicked === true) {
    // renders row with exercise name, update and delete buttons, and a dropdown with exercise description
    return (
      <>
        <tr className="border-top">
          <td onClick={showDescription}
            className="cursor-pointer exerciseRow">
            <RowContents
            // if icons are clicked, will not collapse exercise description
              showDescription={showDescription}
              handleDeleteClick={props.handleDeleteClick}
              handleUpdateClick={props.handleUpdateClick}
              name={props.name}
              id={props.id} />
          </td>
        </tr>
        <tr className="border-top border-bottom border-primary">
          <td className="py-2">{props.description}</td>
        </tr>
      </>
    );

    // just renders row with exercise name, update and delete buttons
  } else {
    return (
      <tr className="border-bottom border-top">
        <td onClick={showDescription}
          className="cursor-pointer exerciseRow">
          <RowContents
            // if icons are clicked, will not render exercise description
            showDescription={showDescription}
            handleDeleteClick={props.handleDeleteClick}
            handleUpdateClick={props.handleUpdateClick}
            name={props.name}
            id={props.id}
          />
        </td>
      </tr>
    );
  }
}

export default TableRow;
