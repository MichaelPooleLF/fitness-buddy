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
    this.updateData = this.updateData.bind(this);
  }

  /*
  * updates values in state with value entered by user
  * name represents name of input, value = the input's value,
  * validity is either string "valid" or string "invalid"
  */
  updateData(name, value, validity) {
    this.setState({
      [name]: { value: value, validity: validity }
    });
  }

  // calculates recommended daily calories
  calculateCalories(inputData) {
    const { gender, weight, height, age, activity } = inputData;
    let bmr = null;
    let calories = null;

    if (gender.value === 'Male') {
      bmr = 66 + (6.3 * weight.value) + (12.9 * height.value) - (6.8 * age.value);
    } else {
      bmr = 655 + (4.3 * weight.value) + (4.7 * height.value) - (4.7 * age.value);
    }

    switch (activity.value) {
      case 'Sedentary':
        calories = bmr * 1.2;
        break;
      case 'Lightly Active':
        calories = bmr * 1.375;
        break;
      case 'Moderately Active':
        calories = bmr * 1.55;
        break;
      case 'Very Active':
        calories = bmr * 1.725;
        break;
      case 'Extra Active':
        calories = bmr * 1.9;
        break;
      default:
        calories = 0;
    }

    return calories;
  }

  // grabs user generated data from form inputs and updates state
  handleChange(event) {
    const name = event.target.name;
    const type = event.target.type;
    let value = event.target.value;

    // sets value to a number if input type is strictly equal to string "number"
    if (value) {
      if (type === 'number') {
        value = parseInt(value);
      }
      this.updateData(name, value, 'valid');

      // if form was already submitted and value is falsy, updates state and input value
      // to invalid, generating red border on input field
    } else if (this.state.alreadySubmitted) {
      this.updateData(name, value, 'invalid');

      // if form was never submitted and value is falsy, sets validity to null
    } else if (this.state[name].validity) {
      this.updateData(name, value, null);
    }
  }

  // checks if form has all valid entries
  // if it does, sets the calories and changes the view to show the model
  // otherwise, sets currently null input values as "invalid"
  handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formIsValid = form.checkValidity();

    // calculates daily recommended calories, sets it in state, and changes the app view
    // if form input values are valid
    if (formIsValid) {
      const calories = parseInt(this.calculateCalories(this.state), 10);

      this.props.updateCalories(calories);
      this.setState({
        calories: calories,
        alreadySubmitted: true
      }, () => { this.props.changeAppView('calorie', 'result'); });

      // if not all form input fields are valid, extracts relevent properties and checks
      // their validity. if the aren't valid, sets validity property to invalid and sets state
    } else {
      const inputs = {
        age: this.state.age,
        weight: this.state.weight,
        height: this.state.height,
        gender: this.state.gender,
        activity: this.state.activity
      };

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

  render() {

    // if view is "result", renders the modal with the daily recommended calories
    if (this.props.componentView === 'result') {
      return (
        <>
          <CalorieCounterResult
            values={this.state}
            calories={this.state.calories}
            returnToCalculator={() => this.props.changeAppView('calorie')}
            returnToPlanner={() => this.props.changeAppView('table')}
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
