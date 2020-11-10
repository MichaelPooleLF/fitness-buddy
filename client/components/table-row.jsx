import React, { useState } from 'react';
import UpdateAndDelete from './update-and-delete';

// returns a row of table data with or without description depending on clicked status
function TableRow(props) {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     routine: [],
  //     isClicked: false
  //   };
  //   this.showDescription = this.showDescription.bind(this);
  // }

  // showDescription() {
  //   this.setState({ isClicked: !this.state.isClicked });
  // }
  const [clicked, setClicked] = useState(false);

  // render() {
  if (clicked === true) {
    return (

      <>
        <tr className="border-bottom border-primary">
          <td onClick={() => setClicked(!clicked)}
            className="cursor-pointer">{props.name}</td>
          <UpdateAndDelete
            onClick={() => setClicked(!clicked)}
            handleDeleteClick={props.handleDeleteClick}
            handleUpdateClick={props.handleUpdateClick}
            id={props.id} />
        </tr>
        <tr className="border-bottom border-primary">
          <td colSpan="2" className="py-2">{props.description}</td>
        </tr>
      </>

    );
  } else {
    return (

      <>
        <tr className="border-bottom">
          <td onClick={() => setClicked(!clicked)}
            className="cursor-pointer">{props.name}</td>
          <UpdateAndDelete
            onClick={() => setClicked(!clicked)}
            handleDeleteClick={props.handleDeleteClick}
            handleUpdateClick={props.handleUpdateClick}
            id={props.id}
          />
        </tr>
      </>

    );
  }
  // }
}

export default TableRow;
