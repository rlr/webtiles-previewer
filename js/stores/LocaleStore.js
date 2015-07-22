var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var WebtileConstants = require('../constants/WebtileConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _locales = [];
var _selectedLocaleKey;


var LocaleStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of locales.
   * @return {object}
   */
  getAll: function() {
    return _locales;
  },

  /**
   * Get the selected locale.
   * @return {object}
   */
  getSelected: function() {
    return LocaleStore.find(_selectedLocaleKey);
  },

  /**
   * Get a locale by key.
   * @param {string} localeKey
   * @return {object}
   */
  find: function(localeKey) {
    return _locales.find(function(locale) {
      return locale.key === _selectedLocaleKey;
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
    case WebtileConstants.LOCALE_SELECT:
      if (_selectedLocaleKey !== action.localeKey) {
        _selectedLocaleKey = action.localeKey;
        LocaleStore.emitChange();
      }
      break;

    case WebtileConstants.LOCALES_LOAD:
      _locales = action.locales;
      _selectedLocaleKey = _locales[0].key;
      LocaleStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = LocaleStore;
