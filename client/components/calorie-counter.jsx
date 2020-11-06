import React from 'react';
import CalorieCounterResult from './calorie-counter-result';
import Header from './header';

class CalorieCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genderselect: 'default',
      activitylevel: 'default',
      age: '',
      weight: '',
      height: '',
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
    if (name === 'genderselect' || name === 'activitylevel') {
      this.setState({
        [name]: value
      });
    } else {
      const parsedValue = parseInt(value);
      if (parsedValue) {
        this.setState({
          [name]: parsedValue
        });
      } else {
        this.setState({
          [name]: ''
        });
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const age = this.state.age;
    const weight = this.state.weight;
    const height = this.state.height;
    const gender = this.state.genderselect;
    const activity = this.state.activitylevel;
    if (age && weight && height && activity && (this.state.genderselect !== 'default')) {
      this.props.caloriesFunction(gender, age, weight, height, activity);
      this.setState({
        calories: this.props.calories,
        view: 'result'
      });
    } else {
      return null;
    }
  }

  handleClick() {
    this.setState({ view: 'calorie' });
  }

  render() {
    const ageValue = this.state.age;
    const weightValue = this.state.weight;
    const heightValue = this.state.height;
    const genderValue = this.state.genderselect;
    const activityValue = this.state.activitylevel;
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
            <form className="col calorie-form" onSubmit={this.handleSubmit}>
              <div className="form-group row ">
                <label htmlFor="gender" className="col-2 col-form-label">Gender</label>
                <div className="col">
                  <select className="form-control" name="gender" value={genderValue} onChange={this.handleChange}>
                    <option disabled value="default">Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              <div className="form-group row ">
                <label htmlFor="age" className='col-2 col-form-label'>Age</label>
                <div className="col">
                  <input type="number" className="form-control" id="age" name="age" placeholder="Please enter your age..."/>
                </div>
              </div>
              <div className="form-group row ">
                <label htmlFor="weight" className='col-2 col-form-label'>Weight</label>
                <div className="col">
                  <input type="number" className="form-control" id="weight" name="weight" placeholder="Please enter your wieght in lbs..." />
                </div>
              </div>
              <div className="form-group row ">
                <label htmlFor="height" className='col-2 col-form-label'>Height</label>
                <div className="col">
                  <input type="number" className="form-control" id="height" name="height" placeholder="Please enter your height in inches..." />
                </div>
              </div>
              <div className="form-group row ">
                <label className="col-2 col-form-label" htmlFor="activity">Activity Level</label>
                <div className="col">
                  <select className="form-control" name="activity" value={activityValue} onChange={this.handleChange}>
                    <option className="calorie-option" disabled value="default">Select your level of activity</option>
                    <option className="calorie-option" value="Sedentary">Sedentary</option>
                    <option className="calorie-option" value="Lightly Active">Lightly Active (1-3 days a week)</option>
                    <option className="calorie-option" value="Moderately Active">Moderately Active (3-5 days a week)</option>
                    <option className="calorie-option" value="Very Active">Very Active (6-7 days a week)</option>
                    <option className="calorie-option" value="Extra Active">Extra Active (7 days a week)</option>
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
