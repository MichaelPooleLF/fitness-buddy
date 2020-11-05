import React from 'react';

class DefaultAndCustomModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleDefaultClick = this.handleDefaultClick.bind(this);
    this.handleCustomClick = this.handleCustomClick.bind(this);
  }

  handleDefaultClick() {
    this.props.setView('default');
  }

  handleCustomClick() {
    this.props.setView('custom');
  }

  render() {
    return (
      <div className="container">
        <div className="card">
          <div className="card-header text-center">Add Entry</div>
          <div className="card-body">
            <p className="card-text text-center">Choose Default or Custom</p>
            <a href="#" className="btn btn-success btn-block" onClick={this.handleDefaultClick}>Default</a>
            <a href="#" className="btn btn-success btn-block" onClick={this.handleCustomClick}>Custom</a>
            <a href="#" className="btn btn-danger btn-block col-5 mx-auto" onClick={this.props.handleCancelClick}>Cancel</a>
          </div>
        </div>
      </div>
    );
  }
}

export default DefaultAndCustomModal;
