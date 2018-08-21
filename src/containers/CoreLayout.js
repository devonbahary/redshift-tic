import React from 'react';
import Header from 'components/Header';
import './CoreLayout.css';

const CoreLayout = props => (
  <div className="app">
    <Header />
    <div className="game__container row">{ props.children }</div>
  </div>
);

export default CoreLayout;
