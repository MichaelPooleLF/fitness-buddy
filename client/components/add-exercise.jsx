import React from 'react';
import AddExerciseForm from './add-exercise-form';
import DefaultList from './default-list';

function AddExercise(props) {

  if (props.componentView === 'add-home') {
    return (
      <div className="container stretch">
        <div className="row">
          <button className="btn btn-outline-primary choose-screen-button"
            onClick={() => props.changeAppView('add-home', 'default')}>
            Add a Pre-Made Exercise
          </button>
        </div>
        <div className="row mt-5">
          <button className="btn btn-outline-primary choose-screen-button"
            onClick={() => props.changeAppView('add-home', 'custom')}>
            Create and Add an Exercise
          </button>
        </div>
      </div>
    );
  }

  if (props.componentView === 'update') {
    return (
      <AddExerciseForm
        header={'Update Exercise'}
        customExerciseId={props.activeExercise.customExerciseId}
        day={props.activeExercise.day}
        exercise={props.activeExercise.exercise}
        description={props.activeExercise.description}
        setExercise={props.setExercises}
        back={() => props.changeAppView('table', 'table')}
      />
    );
  }

  if (props.componentView === 'custom') {
    return (
      <AddExerciseForm
        header={'Add Exercise'}
        day={props.activeExercise.day}
        exercise={props.activeExercise.exercise}
        description={props.activeExercise.description}
        setExercise={props.setExercises}
        back={() => props.changeAppView('add-home', 'add-home')}
      />
    );
  }

  if (props.componentView === 'default') {
    return (
      <DefaultList
        list={props.list}
        handleAddDefault={event => props.handleAddDefault(event)}
      />
    );
  }
}

export default AddExercise;
