import React from 'react';
import CalorieCounterResult from './calorie-counter-result';
import CalorieForm from './calorie-form';

class CalorieCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: { value: '', validity: null },
      activity: { value: '', validity: null },
      age: { value: '', validity: null },
      weight: { value: '', validity: null },
      height: { value: '', validity: null },
      calories: this.props.calories,
      view: 'calorie',
      alreadySubmitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.returnToCalculator = this.returnToCalculator.bind(this);
    this.returnToPlanner = this.returnToPlanner.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  updateData(name, value, validity, formIsValid) {
    this.setState({
      [name]: { value: value, validity: validity }
    }, () => {
      if (formIsValid) {
        this.props.caloriesFunction(this.state);
      }
    });
  }

  handleChange(event) {
    const form = event.currentTarget;
    const formIsValid = form.checkValidity();
    const name = event.target.name;
    const type = event.target.type;
    let value = event.target.value;
    if (value) {
      if (type === 'number') {
        value = parseInt(value);
      }
      this.updateData(name, value, 'valid', formIsValid);
    } else if (this.state.alreadySubmitted) {
      this.updateData(name, value, 'invalid', formIsValid);
    } else if (this.state[name].validity) {
      this.updateData(name, value, null, formIsValid);
    }
  }

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
      this.props.caloriesFunction(inputs);
      this.setState({
        calories: this.props.calories,
        view: 'result',
        alreadySubmitted: true
      });
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

  returnToCalculator() {
    this.setState({ view: 'calorie' });
  }

  returnToPlanner() {
    this.props.setView('table');
  }

  render() {
    if (this.state.view === 'result') {
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
    return (
      <CalorieForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        userData={this.state}/>
    );
  }
}

export default CalorieCounter;
