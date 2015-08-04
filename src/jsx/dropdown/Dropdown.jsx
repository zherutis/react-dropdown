'use strict'

// imports
var React = require('react'),
    _ = require('lodash'),
    DropdownHeader = require('./DropdownHeader'),
    DropdownBody = require('./DropdownBody');

// module
module.exports = React.createClass({
  mixins: [
    require('react-onclickoutside')
  ],
  getInitialState: function() {
    return {
      selectedValue: null,
      bodyVisible: false,
      query: null,
      highlightIndex: 0
    };
  },
  getData: function() {
    if (this.state.query) {
      return this.props.data.filter(function(datum) {
        return datum.text.toLowerCase()
          .indexOf(this.state.query.toLowerCase()) !== -1;
      }, this);
    }
    return this.props.data;
  },
  handleClickOutside: function(e) {
    if (this.state.bodyVisible) {
      this.toggleDropdown(false);
    }    
  },
  handleOptionSelected: function(value) {
    this.setState({selectedValue: value});
    this.toggleDropdown(false);
    this.focus();
  },
  selectHighlighted: function() {
    var highlightedOption = this.getData()[this.state.highlightIndex];
    this.handleOptionSelected(highlightedOption.value);
  },
  toggleDropdown :function(isVisible) {
    var bodyVisible = _.isUndefined(isVisible)
      ? !this.state.bodyVisible
      : isVisible;

    this.setState({
      bodyVisible: bodyVisible
    });
  },
  onEscape: function() {
    this.toggleDropdown(false);
    this.focus();
  },
  focus: function() {
    React.findDOMNode(this.refs.dropdownContainer).focus();
  },
  handleSearch: function(userInput) {
    this.setState({
      query: userInput,
      highlightIndex: 0
    });
  },
  cycleThroughOptions: function(step) {
    var displayedOptionCount = this.getData().length,
        highlightIndex;

    if (step < 0 && this.state.highlightIndex === 0) {
      highlightIndex =
        (displayedOptionCount + step) % displayedOptionCount;
    } else {
      highlightIndex =
        (this.state.highlightIndex + step) % displayedOptionCount;
    }
    this.setState({
      highlightIndex: highlightIndex
    });
  },
  onKeyDown: function(e) {
    switch(e.key) {
      case 'Enter':
        this.toggleDropdown();
        break;
    }
  },
  render: function() {
    return (
      <div
        className="dropdown-container"
        ref="dropdownContainer"
        tabIndex="0"
        style={this.props.style}
        onKeyDown={this.onKeyDown}>
        <DropdownHeader
          handleClick={this.toggleDropdown}
          data={this.props.data}
          emptySelection = {this.props.emptySelection}
          selectedValue={this.state.selectedValue} />
        <DropdownBody
          bodyVisible={this.state.bodyVisible}
          data={this.getData()}
          selectedValue={this.state.selectedValue}
          highlightIndex={this.state.highlightIndex}
          query={this.state.query}
          onSelect={this.handleOptionSelected}
          onEscape={this.onEscape}
          selectHighlighted={this.selectHighlighted}
          cycleThroughOptions={this.cycleThroughOptions}
          handleSearch={this.handleSearch} />
      </div>
    );
  }
});
