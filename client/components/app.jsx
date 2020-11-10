import React from 'react';
import Header from './header';
import Table from './table';
import TableDays from './table-days';
import DefaultAndCustomModal from './add-exercise';
// import Custom from './custom';
// import DefaultList from './default-list-item';
import Footer from './footer';
// import UpdateExercise from './update-exercise';
import CalorieCounter from './calorie-counter';
import RecommendedCalories from './recommended-cal';
import Stopwatch from './stopwatch';

/*
* this is an app for users to organize their exercises for the week
* users can add, update, and delete exercises for each day
* users can calculate their daily calorie needs
* users can use a timer to time their workout and rest periods
*/
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'table',
      day: '1', // day corresponds to day of the week, where 1 = sunday, 2 = monday, etc.
      exercises: [], // array of objects representing exercises user has added to the current day
      defaultExercises: [], // array of objects representing default exercises in our database
      activeExercise: { // stores data of exercise clicked by user
        day: '1',
        exercise: '',
        description: ''
      },
      message: null,
      isLoading: true,
      calories: 1935, // user daily recommended calories
      update: false
    };
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
    this.updateExercises = this.updateExercises.bind(this);
    this.setExercises = this.setExercises.bind(this);
    this.getDefaultExercises = this.getDefaultExercises.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.updateCalories = this.updateCalories.bind(this);
    this.handleAddDefault = this.handleAddDefault.bind(this);
    this.setView = this.setView.bind(this);
    this.resetActiveExercise = this.resetActiveExercise.bind(this);
  }

  // gets list of exercises for Sunday and stores list of default exercises in state
  componentDidMount() {
    this.setExercises(this.state.day);
    this.getDefaultExercises();
  }

  // fetches list of default exercises from database, returning an array of objects
  getDefaultExercises() {
    fetch('/api/routine')
      .then(result => result.json())
      .then(data => {
        this.setState({ defaultExercises: data });
      });
  }

  // fetches list of exercises for a specific day, returning an array of objects
  // dayId is a string representing a number between 1 & 7
  setExercises(dayId) {
    fetch(`/api/routine/day/${dayId}`)
      .then(result => result.json())
      .then(data => this.setState({
        exercises: data,
        day: dayId,
        activeExercise: {
          day: dayId,
          exercise: '',
          description: ''
        }
      }))
      .catch(err => console.error(err));
  }

  // changes view in state, representing user navigating to different pages in the app
  setView(newView) {
    this.setState({
      view: newView
    });
  }

  // method to switch between different day's list of exercises on click
  handleDayClick(event) {
    const dayId = event.currentTarget.getAttribute('id');
    this.setExercises(dayId);
  }

  // calculates recommended daily calories based on calorie-counter user input
  // inputData parameter is an object with gender, weight, height, age, and activity
  updateCalories(inputData) {
    const { gender, weight, height, age, activity } = inputData;
    let bmr = null;
    if (gender.value === 'Male') {
      bmr = 66 + (6.3 * weight.value) + (12.9 * height.value) - (6.8 * age.value);
    } else {
      bmr = 655 + (4.3 * weight.value) + (4.7 * height.value) - (4.7 * age.value);
    }
    let calories = null;
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
    const data = { calories: calories };
    fetch('/api/routine/calories', {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(result => result.json())
      .then(data => this.setState({ calories: data.recommendedCalories }));
  }

  // used to set view back to table. Candidate for merging with previous view method
  handleCancelClick() {
    this.setState({
      view: 'table',
      activeExercise: {
        day: this.state.day,
        exercise: '',
        description: ''
      }
    });
  }

  // method matches exercise clicked with exercise in state and set it to the activeExercise
  // so pass to our update component
  handleUpdateClick(event) {
    const exercises = this.state.exercises.map(element => ({ ...element }));
    const currentExerciseId = parseInt(event.currentTarget.getAttribute('id'), 10);
    exercises.forEach(element => {
      if (element.customExerciseId === currentExerciseId) {
        this.setState({
          activeExercise: element,
          update: true,
          view: 'add-home'
        });
      }
    });
  }

  // finds default exercise information based on exercise clicked in default list
  // and sets it to activeExercise to be passed to our custom component
  handleAddDefault(event) {
    if (event.target.tagName === 'BUTTON') {
      const target = event.currentTarget;
      const day = this.state.day;
      const name = target.firstElementChild.firstElementChild.textContent;
      const desc = target.nextElementSibling.firstElementChild.firstElementChild.firstElementChild.textContent;
      this.setState({
        activeExercise: {
          day: day,
          exercise: name,
          description: desc
        },
        view: 'add-home'
      });
    }
  }

  // method used to add exercises to each day, updating state and table with
  // new exercise
  updateExercises(exercise) {
    const exercises = this.state.exercises.map(element => ({ ...element }));
    exercises.push(exercise);
  }

  // deletes exercise from current exercise list in state upon successful deletion
  handleDeleteClick(event) {
    const exercises = this.state.exercises.map(item => ({ ...item }));
    const itemId = event.currentTarget.getAttribute('id');
    const data = { customExerciseId: itemId, dayId: this.state.day };
    fetch('/api/routine', {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        exercises.forEach((item, index) => {
          if (item.customExerciseId === res.customExerciseId) {
            exercises.splice(index, 1);
          }
        });
        return exercises;
      })
      .then(res => this.setState({
        exercises: res
      }))
      .catch(err => console.error(err));
  }

  resetActiveExercise() {
    this.setState({
      activeExercise: {
        day: this.state.day,
        exercise: '',
        description: ''
      },
      update: false
    });
  }

  render() {

    // sets view to table of user-added exercises
    if (this.state.view === 'table') {
      return (
        <>
          <Header />
          <div className="stick-to-top">
            <RecommendedCalories calories={this.state.calories} />
            <TableDays handleClick={this.handleDayClick} activeDay={this.state.day} />
          </div>
          <Table
            day={this.state.day}
            exercises={this.state.exercises}
            setView={this.setView}
            handleDeleteClick={this.handleDeleteClick}
            handleUpdateClick={this.handleUpdateClick}
          />
          <Footer setView={this.setView} activeIcon={this.state.view}/>
        </>
      );

      // sets view to page where user can choose to add a default exercise or one of their own
      // } else if (this.state.view === 'choose') {
      //   return (
      //     <>
      //       <Header />
      //       <DefaultAndCustomModal
      //         setView={this.setView}
      //         handleCancelClick={this.handleCancelClick}
      //       />
      //       <Footer setView={this.setView} activeIcon={this.state.view}/>
      //     </>
      //   );

      // sets view to page showing a list of default exercises to pick from
      // } else if (this.state.view === 'default') {
      //   return (
      //     <>
      //       <Header />
      //       <DefaultList
      //         list={this.state.defaultExercises}
      //         handleCancelClick={this.handleCancelClick}
      //         handleAddDefault={this.handleAddDefault}
      //       />
      //       <Footer setView={this.setView} activeIcon={this.state.view}/>
      //     </>
      //   );

      // sets view to page where user can add their own exercises
      // } else if (this.state.view === 'custom') {
      //   return (
      //     <>
      //       <Header />
      //       <Custom setExercises={this.setExercises}
      //         updateExercises={this.updateExercises}
      //         activeExercise={this.state.activeExercise}
      //         handleCancelClick={this.handleCancelClick}
      //         day={this.state.day}
      //       />
      //       <Footer setView={this.setView} activeIcon={this.state.view}/>
      //     </>
      //   );

      // sets view to page where user can update an exercise on their list
      // } else if (this.state.view === 'update') {
      //   return (
      //     <>
      //       <Header />
      //       <UpdateExercise
      //         setExercises={this.setExercises}
      //         handleCancelClick={this.handleCancelClick}
      //         exercise={this.state.activeExercise}
      //         day={this.state.day}
      //       />
      //       <Footer setView={this.setView} activeIcon={this.state.view}/>
      //     </>
      //   );

      // sets view to our calorie calculator form
    } else if (this.state.view === 'calorie') {
      return (
        <>
          <Header />
          <CalorieCounter
            caloriesFunction={this.updateCalories}
            calories={this.state.calories}
            setView={this.setView}
          />
          <Footer setView={this.setView} activeIcon={this.state.view}/>
        </>
      );

      // sets view to a stopwatch users can use to time their workout and rest periods
    } else if (this.state.view === 'stopwatch') {
      return (
        <>
          <Header />
          <Stopwatch setView={this.setView}/>
          <Footer setView={this.setView} activeIcon={this.state.view}/>
        </>
      );
    } else if (this.state.view === 'add-home') {
      return (
        <>
          <Header />
          <DefaultAndCustomModal
            update={this.state.update}
            backToPlanner={() => this.setView('table')}
            list={this.state.defaultExercises}
            handleAddDefault={this.handleAddDefault}
            setExercises={this.setExercises}
            updateExercises={this.updateExercises}
            activeExercise={this.state.activeExercise}
            resetActiveExercise={this.resetActiveExercise}
            day={this.state.day}
          />
          <Footer setView={this.setView} activeIcon={this.state.view} />
        </>
      );
    }
  }
}

export default App;
