import React from 'react';
import Header from './header';
import DefaultListItem from './default-list-item';

function DefaultList(props) {
  return (
    <div>
      <Header />
      <DefaultListItem list={props} handleAddDefault={props.handleAddDefault}/>
    </div>
  );
}

export default DefaultList;
