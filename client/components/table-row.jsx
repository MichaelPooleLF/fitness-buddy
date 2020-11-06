import React from 'react';
import UpdateAndDelete from './update-and-delete';

class TableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routine: [],
      isClicked: false
    };
    this.showDescription = this.showDescription.bind(this);
  }

  showDescription() {
    this.setState({ isClicked: !this.state.isClicked });
  }

  render() {
    if (this.state.isClicked === true) {
      return (

        <>
          <tr className="border-bottom border-primary">
            <td onClick={this.showDescription}
              className="cursor-pointer">{this.props.name}</td>
            <UpdateAndDelete
              onClick={this.handleClick}
              handleDeleteClick={this.props.handleDeleteClick}
              handleUpdateClick={this.props.handleUpdateClick}
              id={this.props.id} />
          </tr>
          <tr className="border-bottom border-primary">
            <td colSpan="2" className="py-2">{this.props.description}</td>
          </tr>
        </>

      );
    } else {
      return (

        <>
          <tr className="border-bottom">
            <td onClick={this.showDescription}
              className="cursor-pointer">{this.props.name}</td>
            <UpdateAndDelete
              onClick={this.handleClick}
              handleDeleteClick={this.props.handleDeleteClick}
              handleUpdateClick={this.props.handleUpdateClick}
              id={this.props.id}
            />
          </tr>
        </>

      );
    }
  }
}

export default TableRow;
