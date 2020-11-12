import React, { useState } from 'react';

function AddExerciseForm(props) {

  const [name, updateName] = useState(props.activeExercise.exercise);
  const [desc, updateDesc] = useState(props.activeExercise.description);
  const dayId = props.activeExercise.day;
  const customExerciseId = props.activeExercise.customExerciseId;

  function handleAdd(event) {
    event.preventDefault();
    if (name && desc) {
      const init = {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, desc: desc, dayId: dayId })
      };
      fetch('/api/routine', init)
        .then(result => result.json())
        .then(data => props.setExercise(null, dayId))
        .catch(err => console.error(err));
    }
  }

  function handleUpdate(event) {
    event.preventDefault();
    if (name && desc) {
      const init = {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, desc: desc })
      };
      fetch(`/api/routine/${customExerciseId}`, init)
        .then(result => result.json())
        .then(data => props.setExercise(null, dayId))
        .catch(err => console.error(err));
    }
  }

  const backButtonText = props.header === 'Add Exercise' ? 'Back' : 'Return to Planner';
  const handleSubmit = props.header === 'Add Exercise' ? handleAdd : handleUpdate;

  return (
    // start form container
    <div className="container">

      {/* form header start */}
      <header className="mt-3">
        <h2 className="text-center">{props.header}</h2>
      </header>
      {/* form header end */}

      {/* start add exercise form */}
      <form onSubmit={handleSubmit}>

        {/* exercise name input */}
        <div className="form-group">
          <label htmlFor="name" className="sr-only">Exercise Name</label>
          <input type="text" className="form-control" id="name" name="name"
            placeholder="Exercise Name..." defaultValue={name}
            onChange={event => updateName(event.target.value)} />
        </div>

        {/* exercise description input */}
        <div className="form-group">
          <label htmlFor="desc" className="sr-only">Exercise Description</label>
          <textarea className="form-control" name="desc" id="desc" rows="10"
            placeholder="Describe your exercise here..." defaultValue={desc}
            onChange={event => updateDesc(event.target.value)}></textarea>
        </div>

        {/* button group - submission and cancel */}
        <div className="row justify-content-center">
          <button type="submit" className="btn btn-success">
            {props.header}
          </button>
          <button type="button" className="btn btn-danger ml-3" onClick={props.back}>
            {backButtonText}
          </button>
        </div>
      </form>
      {/* end add exercise form */}

    </div>
    // end form container
  );
}

export default AddExerciseForm;
