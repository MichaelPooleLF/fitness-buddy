import React from 'react';
import CalorieCounterResult from './calorie-counter-result';
import Header from './header';

class CalorieCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: { value: '', valid: null },
      activity: { value: '', valid: null },
      age: { value: '', valid: null },
      weight: { value: '', valid: null },
      height: { value: '', valid: null },
      calories: null,
      view: 'calorie'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    if (name === 'gender' || name === 'activity') {
      this.setState({
        [name]: { value: value, valid: 'valid' }
      });
    } else {
      const parsedValue = parseInt(value);
      if (parsedValue) {
        this.setState({
          [name]: { value: parsedValue, valid: 'valid' }
        });
      } else {
        this.setState({
          [name]: { value: '', valid: 'invalid' }
        });
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const inputs = {
      age: this.state.age,
      weight: this.state.weight,
      height: this.state.height,
      gender: this.state.gender,
      activity: this.state.activity
    };
    if (form.checkValidity()) {
      this.props.caloriesFunction(inputs);
      this.setState({
        calories: this.props.calories,
        view: 'result'
      });
    } else {
      for (const property in inputs) {
        if (!inputs[property].valid) {
          inputs[property].valid = 'invalid';
        }
      }
      this.setState({
        inputs
      });
    }
  }

  handleClick() {
    this.setState({ view: 'calorie' });
  }

  render() {
    const age = this.state.age;
    const weight = this.state.weight;
    const height = this.state.height;
    const gender = this.state.gender;
    const activity = this.state.activity;
    if (this.state.view === 'result') {
      return (
        <CalorieCounterResult
          values={this.state}
          calories={this.props.calories}
          handleClick={this.handleClick}
        />
      );
    }
    return (
      <>
        <Header />
        <div className="container text-center">
          <div className="row my-3">
            <h1 className="col">Calorie Calculator</h1>
          </div>
          <div className="row">
            <p className='col text-center'>{'Fill out the form and press "Submit" to calculate your daily calorie needs'}</p>
          </div>
          <div className="row">
            <form className="col calorie-form" onSubmit={this.handleSubmit} noValidate>
              <div className="form-group row ">
                <label htmlFor="gender" className="col-2 col-form-label">Gender</label>
                <div className="col">
                  <select className={`form-control ${gender.valid}`}
                    name="gender"
                    value={gender.value}
                    onChange={this.handleChange}
                    required>
                    <option disabled value="">Select your gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
              <div className="form-group row ">
                <label htmlFor="age" className='col-2 col-form-label'>Age</label>
                <div className="col">
                  <input type="number"
                    className={`form-control ${age.valid}`}
                    id="age" name="age"
                    placeholder="Please enter your age..."
                    value={age.value}
                    onChange={this.handleChange}
                    required/>
                </div>
              </div>
              <div className="form-group row ">
                <label htmlFor="weight" className='col-2 col-form-label'>Weight</label>
                <div className="col">
                  <input type="number"
                    className={`form-control ${weight.valid}`}
                    id="weight" name="weight"
                    placeholder="Please enter your wieght in lbs..."
                    value={weight.value}
                    onChange={this.handleChange}
                    required/>
                </div>
              </div>
              <div className="form-group row ">
                <label htmlFor="height" className='col-2 col-form-label'>Height</label>
                <div className="col">
                  <input type="number"
                    className={`form-control ${height.valid}`}
                    id="height" name="height"
                    placeholder="Please enter your height in inches..."
                    value={height.value}
                    onChange={this.handleChange}
                    required/>
                </div>
              </div>
              <div className="form-group row ">
                <label className="col-2 col-form-label" htmlFor="activity">Activity Level</label>
                <div className="col">
                  <select className={`form-control ${activity.valid}`}
                    id="activity"
                    name="activity"
                    value={activity.value}
                    onChange={this.handleChange}
                    required>
                    <option disabled value="">Select your level of activity</option>
                    <option value="Sedentary">Sedentary</option>
                    <option value="Lightly Active">Lightly Active (1-3 days a week)</option>
                    <option value="Moderately Active">Moderately Active (3-5 days a week)</option>
                    <option value="Very Active">Very Active (6-7 days a week)</option>
                    <option value="Extra Active">Extra Active (7 days a week)</option>
                  </select>
                </div>
              </div>
              <div className="col text-center">
                <button className="btn btn-success btn-lg">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default CalorieCounter;
