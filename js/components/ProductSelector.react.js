var React = require('react');
var ReactPropTypes = React.PropTypes;

var WebtileActions = require('../actions/WebtileActions');


var ProductSelector = React.createClass({

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
    this.props.products.forEach(function(product) {
      rows.push(<option key={product.key} value={product.key}>{product.value}</option>);
    });

    var selectedProductKey = this.props.selected && this.props.selected.key;

    return (
      <select value={selectedProductKey} onChange={this._onChange}>
        {rows}
      </select>
    );
  },

  /**
   * @param {object} event
   */
  _onChange: function(/*object*/ event) {
    WebtileActions.selectProduct(event.target.value);
  },

});

module.exports = ProductSelector;
