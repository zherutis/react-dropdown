'use strict'
var React = require('react');

module.exports = React.createClass({
  getSelectedValue: function() {
    var filtered = this.props.data.filter(function(option){
      return option.value === this.props.selectedValue;
    }, this);
    return filtered[0] ? filtered[0].text : this.props.emptySelection;
  },
  getClass: function() {
    var classNames = ["dropdown-header"];
    if (!this.props.selectedValue) {
      classNames.push("no-selection");
    }
    return classNames.join(" ");
  },
  render: function() {
    var selectedValue = this.getSelectedValue();

    return (
      <div
        className={this.getClass()}
        onClick={this.props.handleClick}>
        {selectedValue}
      </div>
    );
  }
});
