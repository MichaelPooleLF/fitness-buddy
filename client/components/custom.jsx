import React from 'react';
import Header from './header';

class Custom extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      desc: '',
      dayId: this.props.day
    };
    this.handleDescChange = this.handleDescChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const name = this.props.activeCard.exercise;
    const desc = this.props.activeCard.description;
    this.setState({
      name,
      desc
    });
  }

  handleNameChange(event) {
    const updatedText = event.currentTarget.value;
    this.setState({
      name: updatedText
    });
  }

  handleDescChange(event) {
    const updatedText = event.currentTarget.value;
    this.setState({
      desc: updatedText
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.name && this.state.desc) {
      const init = {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      };
      fetch('/api/routine', init)
        .then(result => result.json())
        .then(data => this.props.setExercises(data.dayId))
        .catch(err => console.error(err));
      this.props.handleCancelClick();
    } else {
      return null;
    }
  }

  render() {
    return (
      <div>
        <Header />
        <h2 className="text-center mt-3">Add Entry</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="sr-only">Exercise Name</label>
            <input type="text" className="form-control" id="name" name="name"
              placeholder="Exercise Name" defaultValue={this.state.name} onChange={this.handleNameChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="desc" className="sr-only">Exercise Description</label>
            <textarea className="form-control" name="desc" id="desc" rows="10"
              placeholder="Describe your exercise here..." defaultValue={this.state.desc}
              onChange={this.handleDescChange}></textarea>
          </div>
          <div className="row justify-content-center">
            <button type="submit" className="btn btn-success">Add Exercise</button>
            <button type="button" className="btn btn-danger ml-3" onClick={this.props.handleCancelClick}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Custom;
