import React from 'react';

function CalorieForm(props) {

  // extract variables for form. Each variable represents an object with a
  // value property and a validity property
  const { age, weight, height, gender, activity } = props.userData;

  return (
    // start component container
    <div className="container text-center">
      {/* Form Header */}
      <header className="row my-3">
        <h1 className="col">Calorie Calculator</h1>
      </header>
      {/* end Form Header */}

      {/* prompts user to fill out and submit form */}
      <div className="row">
        <p className='col text-center'>{'Fill out the form and press "Submit" to calculate your daily calorie needs'}</p>
      </div>
      {/* end prompt */}

      {/* row containig calorie form */}
      <div className="row">
        <form className="col calorie-form" onSubmit={props.handleSubmit} onChange={props.handleChange} noValidate>

          {/* gender input */}
          <div className="form-group row ">
            <label htmlFor="gender" className="col-2 col-form-label">Gender</label>
            <div className="col">
              <select className={`form-control ${gender.validity}`}
                name="gender"
                defaultValue={gender.value}
                required>
                <option disabled value="">Select your gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          {/* age input */}
          <div className="form-group row ">
            <label htmlFor="age" className='col-2 col-form-label'>Age</label>
            <div className="col">
              <input type="number"
                className={`form-control ${age.validity}`}
                id="age" name="age"
                placeholder="Please enter your age..."
                defaultValue={age.value}
                required />
            </div>
          </div>

          {/* weight input */}
          <div className="form-group row ">
            <label htmlFor="weight" className='col-2 col-form-label'>Weight</label>
            <div className="col">
              <input type="number"
                className={`form-control ${weight.validity}`}
                id="weight" name="weight"
                placeholder="Please enter your wieght in lbs..."
                defaultValue={weight.value}
                required />
            </div>
          </div>

          {/* height input */}
          <div className="form-group row ">
            <label htmlFor="height" className='col-2 col-form-label'>Height</label>
            <div className="col">
              <input type="number"
                className={`form-control ${height.validity}`}
                id="height" name="height"
                placeholder="Please enter your height in inches..."
                defaultValue={height.value}
                required />
            </div>
          </div>

          {/* activity input */}
          <div className="form-group row ">
            <label className="col-2 col-form-label" htmlFor="activity">Activity Level</label>
            <div className="col">
              <select className={`form-control ${activity.validity}`}
                id="activity"
                name="activity"
                defaultValue={activity.value}
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

          {/* submit button */}
          <div className="col text-center">
            <button className="btn btn-success btn-lg">Submit</button>
          </div>
        </form>
      </div>
      {/* end form row */}

    </div>
    // end component container
  );
}

export default CalorieForm;
