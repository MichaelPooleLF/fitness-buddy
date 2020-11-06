import React from 'react';
import CalorieCounterResult from './calorie-counter-result';
import Header from './header';

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
    this.handleClick = this.handleClick.bind(this);
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

  handleClick() {
    this.setState({ view: 'calorie' });
  }

  render() {
    const { age, weight, height, gender, activity } = this.state;
    if (this.state.view === 'result') {
      return (
        <CalorieCounterResult
          values={this.state}
          calories={this.state.calories}
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
            <form className="col calorie-form" onSubmit={this.handleSubmit} onChange={this.handleChange} noValidate>
              <div className="form-group row ">
                <label htmlFor="gender" className="col-2 col-form-label">Gender</label>
                <div className="col">
                  <select className={`form-control ${gender.validity}`}
                    name="gender"
                    defaultValue={gender.value}
                    // value={gender.value}
                    // onChange={this.handleChange}
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
                    className={`form-control ${age.validity}`}
                    id="age" name="age"
                    placeholder="Please enter your age..."
                    defaultValue={age.value}
                    // value={age.value}
                    // onChange={this.handleChange}
                    required/>
                </div>
              </div>
              <div className="form-group row ">
                <label htmlFor="weight" className='col-2 col-form-label'>Weight</label>
                <div className="col">
                  <input type="number"
                    className={`form-control ${weight.validity}`}
                    id="weight" name="weight"
                    placeholder="Please enter your wieght in lbs..."
                    defaultValue={weight.value}
                    // value={weight.value}
                    // onChange={this.handleChange}
                    required/>
                </div>
              </div>
              <div className="form-group row ">
                <label htmlFor="height" className='col-2 col-form-label'>Height</label>
                <div className="col">
                  <input type="number"
                    className={`form-control ${height.validity}`}
                    id="height" name="height"
                    placeholder="Please enter your height in inches..."
                    defaultValue={height.value}
                    // value={height.value}
                    // onChange={this.handleChange}
                    required/>
                </div>
              </div>
              <div className="form-group row ">
                <label className="col-2 col-form-label" htmlFor="activity">Activity Level</label>
                <div className="col">
                  <select className={`form-control ${activity.validity}`}
                    id="activity"
                    name="activity"
                    defaultValue={activity.value}
                    // value={activity.value}
                    // onChange={this.handleChange}
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
