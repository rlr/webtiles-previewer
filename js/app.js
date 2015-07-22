var React = require('react');

var WebtilesApp = require('./components/WebtilesApp.react');
var WebtileActions = require('./actions/WebtileActions');
var ProductStore = require('./stores/ProductStore');

React.render(
  <WebtilesApp />,
  document.getElementById('webtiles-app')
);

WebtileActions.selectProduct(ProductStore.getAll()[0].key);
