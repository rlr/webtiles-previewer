var AppDispatcher = require('../dispatcher/AppDispatcher');
var WebtileConstants = require('../constants/WebtileConstants');
var ProductStore = require('../stores/ProductStore');
var LocaleStore = require('../stores/LocaleStore');
var request = require('superagent');

var WebtileActions = {

  /**
   * @param  {string} productKey
   */
  selectProduct: function(productKey) {
    AppDispatcher.dispatch({
      actionType: WebtileConstants.PRODUCT_SELECT,
      productKey: productKey
    });

    request
      .get(ProductStore.getSelected().tileIndexUrl)
      .end(function(err, res){
          if (err) throw err;
          var data = JSON.parse(res.text);
          var locales = [];
          for (var key in data) {
            if (key === '__ver__') continue;
            locales.push({key: key, webtilesUrl: data[key]['ag']});
          }
          WebtileActions.loadLocales(locales);
          WebtileActions.selectLocale(locales[0]['key']);
      });
  },

  /**
   * @param  {string} localeKey
   */
  selectLocale: function(localeKey) {
    AppDispatcher.dispatch({
      actionType: WebtileConstants.LOCALE_SELECT,
      localeKey: localeKey
    });

    WebtileActions.clearWebtiles();

    request
      .get(LocaleStore.getSelected().webtilesUrl)
      .end(function(err, res){
          if (err) throw err;
          var data = JSON.parse(res.text);
          var webtiles = data['directory'];
          console.log(webtiles);
          WebtileActions.loadWebtiles(webtiles);
      });
  },

  /**
   * @param  {array} locales
   */
  loadLocales: function(locales) {
    AppDispatcher.dispatch({
      actionType: WebtileConstants.LOCALES_LOAD,
      locales: locales
    });
  },

  /**
   * @param  {array} tiles
   */
  loadWebtiles: function(webtiles) {
    AppDispatcher.dispatch({
      actionType: WebtileConstants.WEBTILES_LOAD,
      webtiles: webtiles
    });
  },

  clearWebtiles: function() {
    AppDispatcher.dispatch({
      actionType: WebtileConstants.WEBTILES_CLEAR
    });
  }

};

module.exports = WebtileActions;
