'use strict'
var React = require('react'),
    Search = require('./Search'),
    OptionList = require('./OptionList');

module.exports = React.createClass({
  render: function() {
    var {bodyVisible, handleSearch, onEscape, cycleThroughOptions,
        selectHighlighted, ...others} = this.props,
        display = bodyVisible ? "block" : "none",
        styles = {display: display};
    return (
      <div style={styles} className="dropdown-body">
        <Search
          handleSearch={handleSearch}
          onEscape={onEscape}
          cycleThroughOptions={cycleThroughOptions}
          selectHighlighted={selectHighlighted}
          bodyVisible={bodyVisible}/>
        <OptionList {...others} />
      </div>
    );
  }
});
