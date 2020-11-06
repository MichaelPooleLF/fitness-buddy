import React from 'react';
import Header from './header';
import DefaultListItem from './default-list-item';

function DefaultList(props) {
  return (
    <>
      <Header />
      <DefaultListItem list={props} handleAddDefault={props.handleAddDefault}/>
    </>
  );
}

export default DefaultList;
