'use strict'

// imports
var React = require('react'),
    Dropdown = require('./dropdown/Dropdown');

var data = [
  {
    text: 'Element 1',
    value: 1
  },
  {
    text: 'Element 2',
    value: 2
  },
  {
    text: '<asilenas>',
    value: 3
  },
  {
    text: 'Mark <strong>',
    value: 4
  }
];

var dropdownStyle = {
  width: '350px'
};

React.render(
  <Dropdown data={data} emptySelection="Select a value" style={dropdownStyle} />,
  document.getElementById('content')
);
