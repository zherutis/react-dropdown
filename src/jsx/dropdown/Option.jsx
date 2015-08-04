'use strict'
var React = require('react'),
    htmlEscape = require('lodash').escape;

module.exports = React.createClass({
  handleChange: function() {
    this.props.onSelect(this.props.value);
  },
  getClasses: function() {
    var classes = ["dropdown-option"];
    if (this.props.isSelected) {
      classes.push("selected");
    }
    if (this.props.isHighlighted) {
      classes.push("highlight")
    }
    return classes.join(" ");
  },
  /**
  * Must html escape the text before applying highlight, so the span is
  * not escaped.
  * The  is escaped so the RegExp would match against the already
  * escaped text.
  */
  createChild: function() {
    var {text, query} = this.props,
        text = htmlEscape(text),
        html = text;

    if (query) {
      var query = htmlEscape(query),
          re = new RegExp(query, 'i'),
          result = re.exec(text);

      html = (result) ?
        text.replace(result[0], this.applyMatchHighlight(result[0])) :
        text;
    }

    return {__html: html};
  },
  applyMatchHighlight: function(match) {
    return '<span class="match">' + match + '</span>';
  },
  render: function() {
    return (
      <div
        className={this.getClasses()}
        onClick={this.handleChange}
        dangerouslySetInnerHTML={this.createChild()}>
      </div>
    );
  }
});
