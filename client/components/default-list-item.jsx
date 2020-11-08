import React from 'react';
import Exercises from './default-list-item-exercise';

function DefaultListItem(props) {
  const headingsArray = [];
  props.list.forEach(item => {
    if (headingsArray.indexOf(item.bodyPart) === -1) {
      headingsArray.push(item.bodyPart);
    }
  });
  const headers = headingsArray.map((element, index) => {
    return (
      <div className="card" key={index}>
        <div className="card-header" id={`heading${index}`}>
          <h1 className="mb-0 cursor-pointer collapsed text-center" data-toggle="collapse" data-target={`#collapse${index}`}
            aria-expanded="true" aria-controls={`collapse${index}`}>
            {element}
          </h1>
        </div>
        <div id={`collapse${index}`} className="collapse" data-parent="#accordionExample" aria-labelledby={`heading${index}`}>
          <div className="card-body">
            <Exercises list={props.list} bodyPart={element} handleAddDefault={props.handleAddDefault}/>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="accordion container" id="accordionExample">
      {headers}
    </div>
  );
}

export default DefaultListItem;
