'use strict'
var React = require('react'),
    Option = require('./Option');

module.exports = React.createClass({
  render: function() {
    var {onSelect, data, selectedValue, highlightIndex, query} = this.props,
        options = data.map(function(datum, index) {
          var {text, value} = datum,
              isSelected = (selectedValue === value),
              isHighlighted = (index === highlightIndex);
          return (
            <Option
              key={value}
              text={text}
              value={value}
              isSelected={isSelected}
              isHighlighted = {isHighlighted}
              query={query}
              onSelect={onSelect}/>
          );
    });

    return (
      <div className="option-list">
        {options}
      </div>
    );
  }
});
