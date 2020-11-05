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
      <div>
        <Header />
        <div className="container text-center">
          <h1 className="calorie-title">Your Info</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <select name="genderselect" value={genderValue} onChange={this.handleChange}>
                <option disabled value="default">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="form-group">
              <table className="calorie-table">
                <tbody className="calorie-t-body">
                  <tr>
                    <td className="calorie-t-data">
                      <label>Age</label>
                    </td>
                    <td className="calorie-t-data calorie-t-data-textbox">
                      <input
                        name="age"
                        type="text"
                        placeholder="Age"
                        value={ageValue}
                        onChange={this.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="calorie-t-data">
                      <label>Weight (lbs)</label>
                    </td>
                    <td className="calorie-t-data calorie-t-data-textbox">
                      <input
                        name="weight"
                        type="text"
                        placeholder="Weight (lbs)"
                        value={weightValue}
                        onChange={this.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="calorie-t-data">
                      <label>Height (inches)</label>
                    </td>
                    <td className="calorie-t-data calorie-t-data-textbox">
                      <input
                        name="height"
                        type="text"
                        placeholder="Height (inches)"
                        value={heightValue}
                        onChange={this.handleChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="form-group">
              <select name="activitylevel" value={activityValue} onChange={this.handleChange}>
                <option className="calorie-option" value="default" disabled>Activity Level</option>
                <option className="calorie-option" value="Sedentary">Sedentary</option>
                <option className="calorie-option" value="Lightly Active">Lightly Active (1-3 days a week)</option>
                <option className="calorie-option" value="Moderately Active">Moderately Active (3-5 days a week)</option>
                <option className="calorie-option" value="Very Active">Very Active (6-7 days a week)</option>
                <option className="calorie-option" value="Extra Active">Extra Active (7 days a week)</option>
              </select>
            </div>
            <div className="form-group">
              <button className="btn btn-success calorie-submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CalorieCounter;
