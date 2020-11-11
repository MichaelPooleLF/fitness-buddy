import React from 'react';
import Exercises from './default-exercises';

// represents accordion of body parts, each with an accordion of exercise
function DefaultListItem(props) {
  const headingsArray = []; // note: try making this a Set

  // checks if headingsArray already contains the body part and if not, adds it
  props.list.forEach(item => {
    if (headingsArray.indexOf(item.bodyPart) === -1) {
      headingsArray.push(item.bodyPart);
    }
  });

  const headers = headingsArray.map((element, index) => {
    return (
      // represents a list item body part
      <div className="card" key={index}>

        {/* body part name */}
        <div className="card-header" id={`heading${index}`}>
          <h1 className="mb-0 cursor-pointer collapsed text-center" data-toggle="collapse" data-target={`#collapse${index}`}
            aria-expanded="true" aria-controls={`collapse${index}`}>
            {element}
          </h1>
        </div>

        {/* drop-down containing an accordion of exercises associated with this body part */}
        <div id={`collapse${index}`} className="collapse" data-parent="#accordionExample" aria-labelledby={`heading${index}`}>
          <div className="card-body">
            <Exercises list={props.list} bodyPart={element} handleAddDefault={props.handleAddDefault}/>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="accordion container mt-3" id="accordionExample">
      {headers}
    </div>
  );
}

export default DefaultListItem;
