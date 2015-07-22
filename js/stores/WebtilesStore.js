var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var WebtileConstants = require('../constants/WebtileConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _webtiles = [];


var WebtilesStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of locales.
   * @return {object}
   */
  getAll: function() {
    return _webtiles;
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
    case WebtileConstants.WEBTILES_LOAD:
      _webtiles = action.webtiles;
      WebtilesStore.emitChange();
      break;

    case WebtileConstants.WEBTILES_CLEAR:
      _webtiles = [];
      WebtilesStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = WebtilesStore;
