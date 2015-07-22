var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var WebtileConstants = require('../constants/WebtileConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _products = [
  {key: 'desktop', value: 'Desktop', tileIndexUrl: 'https://tiles.cdn.mozilla.net/desktop_tile_index_v3.json'},
  {key: 'prerelease', value: 'Prerelease', tileIndexUrl: 'https://tiles.cdn.mozilla.net/desktop-prerelease_tile_index_v3.json'},
  {key: 'android', value: 'Android', tileIndexUrl: 'https://tiles.cdn.mozilla.net/android_tile_index_v3.json'}
];
var _selectedProductKey;


var ProductStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of products.
   * @return {object}
   */
  getAll: function() {
    return _products;
  },

  /**
   * Get the selected product.
   * @return {object}
   */
  getSelected: function() {
    return _products.find(function(product) {
      return product.key === _selectedProductKey;
    });
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case WebtileConstants.PRODUCT_SELECT:
      if (_selectedProductKey !== action.productKey) {
        _selectedProductKey = action.productKey;
        ProductStore.emitChange();
      }
      break;

    default:
      // no op
  }
});

module.exports = ProductStore;
