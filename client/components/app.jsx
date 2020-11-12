import React from 'react';
import { Header, Footer } from './head-and-foot';
import { Table, TableDays, RecommendedCalories } from './planner';
import { AddExercise } from './add-exercise-feature';
import { CalorieCalculator } from './calorie-calculator';
import { Stopwatch } from './timer';

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
      calories: 1935, // user daily recommended calories
      componentView: 'table'
    };
    this.setExercises = this.setExercises.bind(this);
    this.changeAppView = this.changeAppView.bind(this);
    this.updateCalories = this.updateCalories.bind(this);
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleAddDefault = this.handleAddDefault.bind(this);
  }

  // gets list of exercises for Sunday and stores list of default exercises in state
  componentDidMount() {
    this.initializeState();
  }

  // fetches list of default exercises and exercises for day in state, storing the
  // results in variables, then storing the data in state
  initializeState() {
    let defaultExercises = [];
    fetch('/api/routine')
      .then(result => result.json())
      .then(data => {
        defaultExercises = data;
        return fetch(`/api/routine/day/${this.state.day}`)
          .then(result => result.json())
          .then(data => {
            this.setState({
              exercises: data,
              defaultExercises: defaultExercises
            });
          });
      })
      .catch(err => console.error(err));
  }

  // fetches list of exercises for a specific day, returning an array of objects
  // dayId is a string representing a number between 1 & 7
  // if method not called by event handler, first parameter is null
  setExercises(event, dayId) {
    // if method called by clicking on day in table, sets day id to day clicked
    if (event) {
      dayId = event.currentTarget.getAttribute('id');
    }

    fetch(`/api/routine/day/${dayId}`)
      .then(result => result.json())
      .then(data => this.setState({
        exercises: data,
        day: dayId,
        activeExercise: {
          day: dayId,
          exercise: '',
          description: ''
        },
        view: 'table',
        componentView: 'table'
      }))
      .catch(err => console.error(err));
  }

  // sets view and componentView in state, and resets activeExercise
  changeAppView(newView, componentView) {
    let updateComponentView = componentView;
    const activeExercise = {
      day: this.state.day,
      exercise: '',
      description: ''
    };

    if (!componentView) {
      updateComponentView = newView;
    }

    this.setState({
      view: newView,
      day: this.state.day,
      activeExercise: activeExercise,
      componentView: updateComponentView
    });
  }

  // calculates recommended daily calories based on calorie-counter user input
  // inputData parameter is an object with gender, weight, height, age, and activity
  updateCalories(calories) {
    const data = { calories: calories };
    fetch('/api/routine/update/calories', {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(result => result.json())
      .then(data => {
        this.setState({ calories: data.recommendedCalories });
      });
  }

  // method matches exercise clicked with exercise in state and set it to the activeExercise
  // so pass to our update component
  handleUpdateClick(event) {
    const exercises = this.state.exercises.map(element => ({ ...element }));
    const itemId = parseInt(event.currentTarget.getAttribute('exerciseid'), 10);
    exercises.forEach(element => {
      if (element.customExerciseId === itemId) {
        this.setState({
          activeExercise: element,
          view: 'add-home',
          componentView: 'update'
        });
      }
    });
  }

  // deletes exercise from current exercise list in state upon successful deletion
  handleDeleteClick(event) {
    const exercises = this.state.exercises.map(item => ({ ...item }));
    const itemId = event.currentTarget.getAttribute('exerciseid');
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
        view: 'add-home',
        componentView: 'custom'
      });
    }
  }

  render() {
    // sets view to table of user-added exercises
    if (this.state.view === 'table') {
      return (
        <>
          <Header />
          <div className="stick-to-top">
            <RecommendedCalories calories={this.state.calories} />
            <TableDays handleClick={this.setExercises} activeDay={this.state.day} />
          </div>
          <Table
            exercises={this.state.exercises}
            handleDeleteClick={this.handleDeleteClick}
            handleUpdateClick={this.handleUpdateClick}
          />
          <Footer changeAppView={this.changeAppView} activeIcon={this.state.view}/>
        </>
      );

      // sets view to our calorie calculator form
    } else if (this.state.view === 'calorie') {
      return (
        <>
          <Header />
          <CalorieCalculator
            updateCalories={this.updateCalories}
            calories={this.state.calories}
            componentView={this.state.componentView}
            changeAppView={this.changeAppView}
          />
          <Footer changeAppView={this.changeAppView} activeIcon={this.state.view}/>
        </>
      );

      // sets view to a stopwatch users can use to time their workout and rest periods
    } else if (this.state.view === 'stopwatch') {
      return (
        <>
          <Header />
          <Stopwatch/>
          <Footer changeAppView={this.changeAppView} activeIcon={this.state.view}/>
        </>
      );

      // sets view to a page where users can begin to add exercises to the planner
    } else if (this.state.view === 'add-home') {
      return (
        <>
          <Header />
          <AddExercise
            changeAppView={this.changeAppView}
            componentView={this.state.componentView }
            list={this.state.defaultExercises}
            handleAddDefault={this.handleAddDefault}
            setExercises={this.setExercises}
            activeExercise={this.state.activeExercise}
          />
          <Footer changeAppView={this.changeAppView} activeIcon={this.state.view} />
        </>
      );
    }
  }
}

export default App;
