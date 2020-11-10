import React from 'react';

// this component allows users to add custom exercises to the planner
class Custom extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '', // represents exercise name
      desc: '', // represents exercise description
      dayId: this.props.day // property type is a string of a number representing a day of the week
    };
    this.handleDescChange = this.handleDescChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // component setting the name and description to passed in props
  // will be used to combine update exercise and custom exercise pages
  componentDidMount() {
    const name = this.props.activeExercise.exercise;
    const desc = this.props.activeExercise.description;
    this.setState({
      name,
      desc
    });
  }

  // updates state to exercise name input by user
  // candidate for merging with handleDescChange
  handleNameChange(event) {
    const updatedText = event.currentTarget.value;
    this.setState({
      name: updatedText
    });
  }

  // updates state to exercise description input by user
  // candidate for merging with handleNameChange
  handleDescChange(event) {
    const updatedText = event.currentTarget.value;
    this.setState({
      desc: updatedText
    });
  }

  /* checks that user has input exercise name and description, adds exercise to
  * database, then brings user back to table. Otherwise, nothing happens
  *
  * note: will add validity functionality to this component
  */
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
      // start form container
      <div className="container">

        {/* form header start */}
        <header className="mt-3">
          <h2 className="text-center">Add Exercise</h2>
        </header>
        {/* form header end */}

        {/* start add exercise form */}
        <form onSubmit={this.handleSubmit}>

          {/* exercise name input */}
          <div className="form-group">
            <label htmlFor="name" className="sr-only">Exercise Name</label>
            <input type="text" className="form-control" id="name" name="name"
              placeholder="Exercise Name" defaultValue={this.state.name} onChange={this.handleNameChange}/>
          </div>

          {/* exercise description input */}
          <div className="form-group">
            <label htmlFor="desc" className="sr-only">Exercise Description</label>
            <textarea className="form-control" name="desc" id="desc" rows="10"
              placeholder="Describe your exercise here..." defaultValue={this.state.desc}
              onChange={this.handleDescChange}></textarea>
          </div>

          {/* button group - submission and cancel */}
          <div className="row justify-content-center">
            <button type="submit" className="btn btn-success">Add Exercise</button>
            <button type="button" className="btn btn-danger ml-3" onClick={this.props.handleCancelClick}>Cancel</button>
          </div>
        </form>
        {/* end add exercise form */}

      </div>
      // end form container
    );
  }
}

export default Custom;
