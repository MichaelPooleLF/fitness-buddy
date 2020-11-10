import React from 'react';

// this component represents the accordion within the default list item accordion
function Exercises(props) {

  const exercises = [];
  props.list.forEach(element => {
    if (element.bodyPart === props.bodyPart) { // only adds exercises associated with current body part
      exercises.push(

        // represents exercise and description drop-down
        <div className="card row" key={element.exerciseId}>

          {/* exercise name row */}
          <div className="card-header row justify-content-between align-items-center collapsed  cursor-pointer"
            id={`exerciseHeading${element.exerciseId}`} data-toggle="collapse"
            data-target={`#collapseInner${element.exerciseId}`} aria-expanded="true"
            aria-controls={`collapseInner${element.exerciseId}`}
            onClick={props.handleAddDefault}>

            {/* exercise name */}
            <div className="col-9" id={element.exerciseId}>
              <h5>
                {element.exercise}
              </h5>
            </div>

            {/* add button */}
            <div className="col-2 d-flex justify-content-center">
              <button className="btn btn-success">
                      Add
              </button>
            </div>
          </div>

          {/* exercise description drop-down */}
          <div
            id={`collapseInner${element.exerciseId}`}
            className="collapse"
            data-parent={`#${props.bodyPart}-exerciseAccordion`}
            aria-labelledby={`exerciseHeading${element.exerciseId}`}
          >
            <div className="card-body">
              <div>
                <p>
                  {element.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  });

  return (
    // contains list of exercises associated with body-part
    <div className={`${props.bodyPart}-accordion-inner`}>
      <div className="accordion" id={`${props.bodyPart}-exerciseAccordion`} >
        {exercises}
      </div>
    </div>
  );
}

export default Exercises;
