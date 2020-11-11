import React from 'react';
import CalorieCounterResult from './calorie-counter-result';
import CalorieForm from './calorie-form';

class CalorieCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /*
      * the first 5 properties represent the value of the form inputs and whether or not the input is valid
      * null represents default form borders. other accaptable values for validity are strings "valid" and "invalid"
      * valid input types for gender and activity are strings
      * valid input types for age, weight, and height are numbers. if no input by user, they default to ""
      */
      gender: { value: '', validity: null },
      activity: { value: '', validity: null },
      age: { value: '', validity: null },
      weight: { value: '', validity: null },
      height: { value: '', validity: null },
      calories: this.props.calories,
      alreadySubmitted: false // changes to true when user first tries to submit the form
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.returnToCalculator = this.returnToCalculator.bind(this);
    this.returnToPlanner = this.returnToPlanner.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  /*
  * updates values in state with value entered by user
  * name represents name of input, value = the input's value,
  * validity is either string "valid" or string "invalid", formIsValid is a boolean
  * if all values are valid, calculates daily rec calories and rerenders, passing
  * calculated calories through props
  *
  * bug: calories are set in app state before submission. remove caloriesFunction from
  * updateData and add to handleSubmit
  */
  updateData(name, value, validity, formIsValid) {
    this.setState({
      [name]: { value: value, validity: validity }
    }, () => {
      if (formIsValid) {
        this.props.caloriesFunction(this.state);
      }
    });
  }

  // grabs user generated data from form inputs and updates state
  handleChange(event) {
    const form = event.currentTarget;
    const formIsValid = form.checkValidity();
    const name = event.target.name;
    const type = event.target.type;
    let value = event.target.value;
    if (value) {
      // sets value to a number if input type is strictly equal to string "number"
      if (type === 'number') {
        value = parseInt(value);
      }
      this.updateData(name, value, 'valid', formIsValid);
      // if form was already submitted and value is falsy, updates state and input value
      // to invalid, generating red border on input field
    } else if (this.state.alreadySubmitted) {
      this.updateData(name, value, 'invalid', formIsValid);
    } else if (this.state[name].validity) {
      this.updateData(name, value, null, formIsValid);
    }
  }

  // checks if form has all valid entries
  // if it does, sets the calories and changes the view to show the model
  // otherwise, sets currently null input values as "invalid"
  handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formIsValid = form.checkValidity();
    const inputs = {
      age: this.state.age,
      weight: this.state.weight,
      height: this.state.height,
      gender: this.state.gender,
      activity: this.state.activity
    };

    if (formIsValid) {
      this.setState({
        calories: this.props.calories,
        alreadySubmitted: true
      }, () => { this.props.setView('calorie', 'result'); });
    } else {
      for (const property in inputs) {
        if (!inputs[property].validity) {
          inputs[property].validity = 'invalid';
        }
      }
      this.setState({
        inputs,
        alreadySubmitted: true
      });
    }
  }

  // changes view to "calorie", hiding the modal
  returnToCalculator() {
    this.props.setView('calorie', 'calorie');
  }

  // changes view in app to "table", returning user to the planner
  returnToPlanner() {
    this.props.setView('table', '');
  }

  render() {

    // if view is "result", renders the modal with the daily recommended calories
    if (this.props.componentView === 'result') {
      return (
        <>
          <CalorieCounterResult
            values={this.state}
            calories={this.state.calories}
            returnToCalculator={this.returnToCalculator}
            returnToPlanner={this.returnToPlanner}
          />
          <CalorieForm
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            userData={this.state}/>
        </>
      );
    }

    // otherwise, renders just the form with the current user input. form is clear on initial render.
    return (
      <CalorieForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        userData={this.state}/>
    );
  }
}

export default CalorieCounter;
