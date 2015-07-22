/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the *Store and passes the new data to its children.
 */

var ProductSelector = require('./ProductSelector.react');
var LocaleSelector = require('./LocaleSelector.react');
var WebtilesList = require('./WebtilesList.react');
var React = require('react');
var ProductStore = require('../stores/ProductStore');
var LocaleStore = require('../stores/LocaleStore');
var WebtilesStore = require('../stores/WebtilesStore');

/**
 * Retrieve the current product data from the ProductStore
 */
function getStateFromStores() {
  return {
    products: ProductStore.getAll(),
    selectedProduct: ProductStore.getSelected(),
    locales: LocaleStore.getAll(),
    selectedLocale: LocaleStore.getSelected(),
    webtiles: WebtilesStore.getAll()
  };
}

var WebtilesApp = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    ProductStore.addChangeListener(this._onChange);
    LocaleStore.addChangeListener(this._onChange);
    WebtilesStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ProductStore.removeChangeListener(this._onChange);
    LocaleStore.removeChangeListener(this._onChange);
    WebtilesStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
  	return (
      <div>
        <h1>Webtiles Previewer</h1>
        <ProductSelector products={this.state.products} selected={this.state.selectedProduct} />
        <LocaleSelector locales={this.state.locales} selected={this.state.selectedLocale} />
        <WebtilesList webtiles={this.state.webtiles} />
      </div>
  	);
  },

  /**
   * Event handler for 'change' events coming from the ProductStore
   */
  _onChange: function() {
    this.setState(getStateFromStores());
  }

});

module.exports = WebtilesApp;
