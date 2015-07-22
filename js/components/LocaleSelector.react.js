var React = require('react');
var ReactPropTypes = React.PropTypes;

var WebtileActions = require('../actions/WebtileActions');


var LocaleSelector = React.createClass({

  propTypes: {
    selected: ReactPropTypes.object
  },

  getInitialState: function() {
    return {};
  },

  /**
   * @return {object}
   */
  render: function() /*object*/ {
    var rows = [];
    this.props.locales.forEach(function(locale) {
      rows.push(<option key={locale.key} value={locale.key}>{locale.key}</option>);
    });

    var selectedLocaleKey = this.props.selected && this.props.selected.key;

    return (
      <select value={selectedLocaleKey} onChange={this._onChange}>
        {rows}
      </select>
    );
  },

  /**
   * @param {object} event
   */
  _onChange: function(/*object*/ event) {
    WebtileActions.selectLocale(event.target.value);
  },

});

module.exports = LocaleSelector;
