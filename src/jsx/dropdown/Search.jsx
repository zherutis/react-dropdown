'use strict'
var React = require('react');

module.exports = React.createClass({
  handleChange: function(e) {
    var searchString = (e.target.value !== '') ? e.target.value : null;

    this.props.handleSearch(searchString);
  },
  componentDidUpdate: function() {
    if (this.props.bodyVisible) {
      React.findDOMNode(this.refs.searchInput).focus();
    }
  },
  // arrows did not work with onKeyPress
  onKeyDown: function(e) {
    switch(e.key) {
      case 'ArrowDown':
        this.props.cycleThroughOptions(1);
        break;
      case 'ArrowUp':
        this.props.cycleThroughOptions(-1);
        break;
      case 'Escape':
        React.findDOMNode(this.refs.searchInput).value = '';
        this.props.handleSearch(null);
        this.props.onEscape();
        break;
      case 'Enter':
        this.props.selectHighlighted();
        break;
    }
  },
  render: function() {
    return (
      <input
        type="text"
        ref="searchInput"
        onChange={this.handleChange}
        onKeyDown={this.onKeyDown}
        />
    );
  }
});
