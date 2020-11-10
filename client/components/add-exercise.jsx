import React, { useState } from 'react';
import AddExerciseForm from './add-exercise-form';
import DefaultList from './default-list-item';

function AddExercise(props) {

  const [view, setView] = useState('add-home');

  function addDefault(event) {
    props.handleAddDefault(event);
    setView('custom');
  }

  function back() {
    props.resetActiveExercise();
    setView('add-home');
  }

  if (view === 'add-home') {
    return (
      <div className="container stretch">
        <div className="row">
          <button className="btn btn-outline-primary choose-screen-button"
            onClick={() => setView('default')}>
            Add a Pre-Made Exercise
          </button>
        </div>
        <div className="row mt-5">
          <button className="btn btn-outline-primary choose-screen-button"
            onClick={() => setView('custom')}>
            Create and Add an Exercise
          </button>
        </div>
      </div>
    );
  }

  if (view === 'custom') {
    return (
      <AddExerciseForm
        header={'Add Exercise'}
        day={props.activeExercise.day}
        exercise={props.activeExercise.exercise}
        description={props.activeExercise.description}
        setExercise={props.setExercise}
        back={back}
      />
    );
  }

  if (view === 'default') {
    return (
      <DefaultList
        list={props.list}
        handleAddDefault={addDefault}
      />
    );
  }
}

export default AddExercise;
