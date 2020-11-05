import React from 'react';

class Exercises extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const exercises = [];
    this.props.list.forEach(element => {
      if (element.bodyPart === this.props.bodyPart) {
        exercises.push(
          <div className="card row" key={element.exerciseId}>
            <div className="card-header row justify-content-between align-items-center collapsed  cursor-pointer"
              id={`exerciseHeading${element.exerciseId}`} data-toggle="collapse"
              data-target={`#collapseInner${element.exerciseId}`} aria-expanded="true"
              aria-controls={`collapseInner${element.exerciseId}`}
              onClick={this.props.handleAddDefault}>
              <div className="col-9" id={element.exerciseId}>
                <h5>
                  {element.exercise}
                </h5>
              </div>
              <div className="col-2 d-flex justify-content-center">
                <button className="btn btn-success">
                      Add
                </button>
              </div>
            </div>
            <div
              id={`collapseInner${element.exerciseId}`}
              className="collapse"
              data-parent={`#${this.props.bodyPart}-exerciseAccordion`}
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
      <>
        <div className={`${this.props.bodyPart}-accordion-inner`}>
          <div className="accordion" id={`${this.props.bodyPart}-exerciseAccordion`} >
            {exercises}
          </div>
        </div>
      </>
    );
  }
}

export default Exercises;
